---
slug: testing-lossless-model-compression
title: Testing lossless model compression without fooling myself
date: 2026-11-09
authors: mistermunchkin
tags: [ai, local-models, mlx, compression, benchmarking]
description: What my lossless model compression experiments taught me about disk size, memory footprints, correctness checks, and the cost of on-demand decoding.
keywords: [lossless compression, local models, MLX, Qwen3, BF16, benchmarking]
---

I wanted to find out whether I could run a higher-precision local model with less memory, while preserving every weight exactly. The first result looked promising: about 25% smaller weight storage.

Then I asked why the RAM usage was almost unchanged.

That question ended up shaping the experiment. The compression worked, but I had to separate several different claims: a smaller file, a smaller memory footprint, and a model that was actually more practical to run.

<!-- truncate -->

## Why I wanted to try it

I was already using a quantized model through Ollama. For this experiment, I wanted to explore a different trade-off: keep the original BF16 weight values and pay the cost of decoding them as they were needed.

The goal was practical. Could this help me run a model on my Mac with less pressure on memory, while keeping its original weights?

That meant testing more than a compression ratio. The model still needs working buffers, activations and a KV cache for attention. Decoding also takes time. Saving space in one part of the system only helps if the rest of the execution makes the trade worthwhile.

## Experiment setup

These were bounded experiments on my Apple M5 Pro MacBook using Qwen3 BF16 weights and a custom MLX loader. The reported comparisons are individual short raw/compressed runs, not averages across repeated trials. The 1.7B case generated “Blue.” and an end-of-sequence token, with two decode steps; the 8B case generated “blue” and an end-of-sequence token, with one decode step. The memory figures below are the experiment's peak charged-footprint measurements, rather than a claim of continuous physical residency.

## What I did

### Build a loader around the existing model

With AI coding tools helping with implementation and testing, I explored a custom weight format, loader and on-demand decoder. MLX still handled the model calculations.

The basic approach was to decode a chunk of weights, use it for the current calculation, then reuse the buffer. That avoided keeping a full decompressed copy alongside the compressed weights.

Correctness needed its own checks. In an early CPU/GPU comparison, the uncompressed GPU baseline failed numerical validation. The cause was the GPU's reduced-precision multiplication setting. Explicitly using full FP32 passed the original accuracy threshold.

The failure happened before compression was involved. Keeping that control separate saved us from blaming the decoder or relaxing the accuracy requirement to make the test pass.

### Separate disk savings from RAM savings

The Qwen3-8B streaming test reduced weight storage from 16.38 GB to 12.29 GB, about 25%. All 8.19 billion weight values survived compression bit-for-bit. Raw and compressed execution also produced identical logits and output in the short inference test.

But both loaders were reading small chunks from disk. The raw baseline already avoided keeping all the weights in memory, so compression did not reduce measured working memory. The decoder added a little overhead instead.

I asked why we were not decoding on demand. We already were. The missing distinction was where the compressed weights lived between calculations.

To test the memory-saving idea I actually cared about, the comparison needed to keep the weight payload in RAM: raw weights in one version, compressed weights with a reusable decoding buffer in the other.

### Measure the smaller resident case

On the 1.7B test, peak charged memory fell from about 3.42 GiB to 2.62 GiB, a reduction of 23.3%. The full weight payload was resident at each observed inference checkpoint, and the logits matched.

The cost showed up in execution time. Prompt processing took about 43% longer, and the two measured decode steps took about 50% longer. Neither inference run recorded swap-in or swap-out.

That gave me a useful result at a small scale: the approach could reduce the measured memory footprint while preserving the tested output. It also made the speed penalty concrete. Two decode steps were enough for a bounded check, but far too few to describe sustained generation performance.

### Treat the larger run carefully

The 8B comparison was harder because the laptop's memory state changed between runs.

In an initial attempt, the raw version stopped after two continuous minutes of yellow memory pressure, before inference. The compressed version later completed. It would have been easy to treat that as proof that compression made the model fit.

But the compressed run started with much more available memory after the earlier run's paging and cleanup. It had also experienced paging during loading. Those conditions could not support a clean capacity comparison.

I then requested another comparison, compressed first and raw second, with the starting state recorded for each. Both completed with identical logits and output:

- Peak charged memory was 11.71 GiB compressed versus 15.51 GiB raw, about 24.5% lower.

- Prompt processing took 3.48 seconds compressed versus 2.67 seconds raw, about 30% longer.

- The next-token step took 3.21 seconds compressed versus 2.21 seconds raw, about 45% longer.

Both runs involved paging. Compressed started with 9.69 GiB available, while raw started with 17.70 GiB after cleanup. These are measurements from a completed comparison, with different starting conditions. They do not establish a controlled reduction in system memory pressure or a fully resident 8B result.

Peak charged memory also needs to stay attached to its label. It is the footprint metric recorded by the experiment, not a claim that all those bytes were physically resident throughout the run.

### Choose comparisons that answer the question

I also wanted to compare against the quantized 9B model I was using in Ollama. That was useful as an everyday reference, but it used a different model, architecture and precision. It could not isolate the benefit of this compression approach.

Likewise, preserving BF16 weights did not establish better coding performance. The inference checks used short outputs. They checked that this execution path matched its baseline on those cases, not that the prototype was a better coding assistant.

There was related work too, including [DFloat11](https://github.com/LeanModels/DFloat11), which explores compressed BF16 weights with on-demand decoding. The useful question for this project was whether the trade-off could work well on my Mac.

## Key takeaways

- **Decide which memory problem you are testing.** Disk size, working memory during streaming, and a resident model's footprint are different measurements.

- **Keep correctness checks separate from performance claims.** Bit-exact weights and matching logits support specific checks. A short inference test does not establish broad model quality.

- **Record the machine's starting state.** Run order, paging and cleanup affected what the 8B comparison could tell me.

- **Put the latency cost beside the memory saving.** A smaller footprint can still come with slower generation.

- **Use the same model and precision to isolate the change.** An Ollama run with a different quantized model answers a different question.

The experiments showed useful storage and footprint savings, with slower execution. They left me with a working research prototype and a clearer benchmark question.

Before treating it as an everyday inference option, I would want repeated runs under comparable starting conditions, longer generation tests, and a closer look at where decoding time goes. The result so far is a measurable trade-off, with enough limits to keep the next decision honest.
