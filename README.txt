ionic cordova resources


# - passo 0 - quando não tem a chave
Gerar assinatura
-----------------------------------------------------------------------------------------
keytool -genkey -v -keystore debug.keystore -storepass app_fluxo_caixa -alias androiddebugkey -keypass app_fluxo_caixa -keyalg RSA -keysize 2048 -validity 10000

-----------------------------------------------------------------------------------------
# - passo 1
rm -rf app_fluxo_caixa.apk
-----------------------------------------------------------------------------------------
# - passo 2
 ionic cordova build android --release
-----------------------------------------------------------------------------------------
# - passo 3
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore debug.keystore /Users/romulofireman/app_fluxo_caixa/app-app_fluxo_caixa/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk androiddebugkey
-----------------------------------------------------------------------------------------
## digitar password: app_fluxo_caixa
-----------------------------------------------------------------------------------------
# - passo 4
/Users/romulofireman/Library/Android/sdk/build-tools/28.0.3/zipalign -v 4 /Users/romulofireman/app_fluxo_caixa/app-app_fluxo_caixa/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk app_fluxo_caixa.apk
-----------------------------------------------------------------------------------------
## instalar app no celular e ver o log de erro, conectar o celular no usb e destravar o celular
# - passo 5
 ~/platform-tools/adb install -r app_fluxo_caixa.apk

-----------------------------------------------------------------------------------------
Addicionar plataforma, ANDROID, IPHONE

 ionic cordova resources
 ionic cordova resources --icon
 ionic cordova resources --splash

 ionic emulate ios
 ionic emulate ios --target="iPhone-5s"

 cordova prepare ios
 cordova platform remove ios
 cordova platform add ios
 chmod -R 777 platforms/ios/


-----------------BUILD IPHONE--------------------------------------------------

cordova platform add ios
ionic cordova build ios --release
cordova prepare ios


