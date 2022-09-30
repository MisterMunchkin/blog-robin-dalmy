---
title:  "How to work with Expo Bare Workflow"
description: Learn how to set up, build, and run expo bare workflow for iOS, and Android.
keywords: [expo, bare, workflow, how-to, iOS, Android]
slug: how-to-work-with-expo-bare-workflow
categories: Expo
authors: mistermunchkin
tags: [expo, reactnative, mobile, how-to]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

We will go through how to run and debug Android and iOS on an Expo Bare Workflow [Locally](#running-expo-bare-workflow-localy) through [Emulator](#running-on-an-emulator) and  [Physical Device](#running-on-a-physical-device), with [Expo Go](#running-expo-bare-workflow-with-expo-go), and with [EAS Build](#running-expo-bare-workflow-with-eas-build).

This blog assumes you have already installed the usual things you need to run expo apps which are expo-cli, yarn, and node.js

**Note** node version *lts/gallium* worked best for me.

<!-- truncate -->

## First Things First...
If you want to run your custom code (custom iOS/Android code) locally, you need to make sure your environment is set up for it. To determine this, you can run
```bash 
npx @react-native-community/cli doctor
```

For more information on how this command works, check [this blog out](https://reactnative.dev/blog/2019/11/18/react-native-doctor)

The doctor should automatically fix environment issues for you and install whatever it needs to install, but in the event it doesn't, you can install each manually yourself.

<Tabs>
<TabItem value='ios' label='iOS 🍎 Requirements' default>

- **XCode** Required for building and installing your app on iOS
- **CocoaPods** Required for installing iOS dependencies
- **ios-deploy** Required for installing your app on a physical device with the CLI
- **Watchman** Used for watching changes in the filesystem when in development mode

</TabItem>

<TabItem value='android' label='Android 🤖 Requirements' default>

- **JDK** version 11.0.14.1 or 11.0.15 worked best for me
- **Android Studio** Required for building and installing your app on Android
- **Android SDK and Android Emulator** All can be installed in Android Studio
- **ANDROID_HOME** environment variables you need to set up in your machine

</TabItem>
</Tabs>

I won't go through the specifics on how to install each because they are all google-able and well documented.


For iOS, There's no way to locally build and run without a Mac. If you don't have one, you can use [MacInCloud](https://www.macincloud.com) which lets you rent Mac.

Cocoapods, Watchman, and ios-deploy can all be installed using brew. 

```bash title='Brew Install for iOS'
brew install ios-deploy
brew install watchman
brew install cocoapods
```

You can also install Cocoapods from your default ruby available on macOS
```bash
sudo gem install cocoapods
```

After CLI doctor is successful, we can now start running our Expo Bare Workflow app.

## Running Expo Bare Workflow Locally

After you have set up your environment as mentioned above, you can run these commands inside your project's root folder.
<Tabs>
<TabItem value='ios' label='iOS 🍎' default>

```bash title='Expo Run Command for iOS'
expo run:ios
```

</TabItem>
<TabItem value='android' label='Android 🤖' default>

```bash title='Expo Run Command for Android'
expo run:android
```

</TabItem>
</Tabs>


These commands will create the **/ios** and **/android** folders, install dependencies, build your project and deploy them to either a simulator or a physical device depending on what's available. 

If you are coming from a **Managed Workflow**, then it will eject iOS/Android when you run these commands. More information about these commands is in the [Expo Up and Running](https://docs.expo.dev/bare/hello-world/#ios-configuration) docs.

### Running on an Emulator
if you take a look at your project folder, you will notice that an **ios/** or **android/** folder has been created. 

You can open these folders in XCode or Android Studio, and then create your emulators or select them so when you run `expo run:ios/android` it will build for the emulator selected.

### Running on a Physical Device
You can use the QR Code that will be generated when metro is running after expo run. If you're having problems with that, you can also set it to run on a physical device by connecting your device via USB, and setting it up for development. Then run

<Tabs>
<TabItem value='iOS' label='iOS 🍎' default>

```bash 
expo run:ios -d 'device uuid'
```

</TabItem>
<TabItem value='Android' label='Android 🤖' default>

```bash 
expo run:android -d 'device uuid'
```

</TabItem>
</Tabs>

Replace 'device uuid' with the device uuid that you want to deploy your app to. 

To get your device uuid run this in the terminal.
```bash
xcrun xctrace list devices
```
[More info on getting device uuid](https://stackoverflow.com/questions/17237354/how-can-i-find-the-device-uuids-of-all-connected-devices-through-a-command-line)

### Additional Considerations for Running on Physical Devices

<Tabs>
<TabItem value='ios' label='iOS 🍎' default>

For **iOS** You also need to make sure it is part of the provisioning profile of your **Apple Team Account**. I also had a problem with [main.jsbundle being empty](https://stackoverflow.com/questions/57822215/main-jsbundle-file-showing-in-my-ios-project-but-still-throwing-no-bundle-url-p). So following the stack overflow issue, I added this to our package.json scripts

```json title='package.json'
 "build:ios-dev": "react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=true --platform='ios'"
```

This will allow us to populate main.jsbundle using this command `yarn run build:ios-dev`

When the jsbundle has been successfully populated, you can then run this command to finally run for an iOS device `expo run:ios -d --configuration development`.


</TabItem>
<TabItem value='android' label='Android 🤖'>

No issues with Android so far ✨ If you have any please let me know by commenting below!

</TabItem>
</Tabs>

### Installing Dev Client
[Expo Development Installation](https://docs.expo.dev/development/installation/) documentation will guide you through how to install expo-dev-client onto your project. This will give you some quality of life improvements during development.

## Running Expo Bare Workflow with Expo Go

Despite what this [Expo Documentation](https://docs.expo.dev/bare/using-expo-client/) says, it is possible to run **Expo Bare Workflows** with **Expo Go**. The problem is that it won't build the custom code you wrote in your iOS/Android 💩. What this means is that Expo Go would still work, but it would just ignore your custom code. You can read more about why they did this here [Using Expo Go With Bare Workflow](https://docs.expo.dev/bare/using-expo-client/).

TLDR; If your app isn't too reliant on custom native code, and you just something quick and easy for your shareholders to run, you can still use Expo Go.

## Running Expo Bare Workflow with EAS Build
If you do need to build your projects without having to configure your machine for it locally, you can always use [EAS Build](https://docs.expo.dev/build/introduction/). What EAS Build allows you to do is to build your Bare Workflow on Expo Servers instead of on your machine. This allows Windows machines to create builds for iOS.

The Expo Documentation does a good job of going through how to work with EAS Builds step by step, so I'll just list the docs I've used to make it work here.

- [Configure your project for EAS Build](https://docs.expo.dev/build/setup/) - This will guide you on how to get EAS Build to work on your project
- [Creating and Installing your development build](https://docs.expo.dev/development/getting-started/#creating-and-installing-your-first-development-build) - This will guide you on how to build and run your EAS build to devices/simulators
- [Configuring EAS Build for internal distribution](https://docs.expo.dev/build/internal-distribution/) - This will guide you on how to create builds that you can share with a select number of devices for internal distribution

:::note expo-dev-client
I also installed expo-dev-client before configuring EAS Build. So yea, try each one and tell me about it. Check out the [Installing Dev Client](#installing-dev-client) section above.
:::


## Closing Thoughts

So this is all I know so far through my journey in Mobile Development using React Native, Expo, and iOS/Android Native code. Feel free to DM me or email me if you have any questions!

I'm also thinking of doing more blogs on different things I couldn't find any blogs for. I run on the need to feel validated by strangers on the internet, and coffee. [buy me a ☕️](https://www.paypal.com/donate/?hosted_button_id=B9HDECYJ4CEF8)