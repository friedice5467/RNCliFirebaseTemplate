# React Native CLI Firebase Template

This is a custom React Native template based off of https://github.com/invertase/react-native-firebase-authentication-example with some modifications.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (https://nodejs.org/)
- Watchman (for macOS users)
- Android Studio or Xcode (for iOS development, macOS only)
- An active Firebase project

## Using This Template

### Create a New Project

To create a new React Native project using this template, run the following command:

```bash
npx react-native init MyNewProject --template https://github.com/friedice5467/RNCliFirebase.git
```

Replace `MyNewProject` with your desired project name.

### Set up Firebase

After creating your project, you'll need to configure Firebase:

1. Navigate to your Firebase project in the Firebase Console.
2. Go to Project Settings.
3. Under the "General" tab, download the `google-services.json` for Android and place it in the `android/app` directory of your new project.
4. For iOS, download the `GoogleService-Info.plist` and use Xcode to include it in your project.

### Install Dependencies

Navigate to your project directory and install the necessary dependencies:

```bash
cd MyNewProject
npm install
```

### Running Your App

#### Android

```bash
npx react-native run-android
```

#### iOS (macOS only)

```bash
npx react-native run-ios
```

## Additional Configuration

Refer to the specific documentation of libraries included in this template for additional configuration steps and usage instructions.

## Support

For support, email [support@example.com](mailto:support@example.com) or visit our [support website](#).

## Contributing

Contributions to this project are welcome. Please ensure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.