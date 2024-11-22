package com.galaxies.ExpenseManager;

import android.app.Application;
import android.content.res.Configuration;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactHost;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;

import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;
import java.util.List;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;

public class MainApplication extends Application implements ReactApplication {

    // private final ReactNativeHost reactNativeHost = new ReactNativeHostWrapper(
     private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
                @Override
                 public boolean getUseDeveloperSupport() {
                 return BuildConfig.DEBUG;
                }
            // this,
            // new DefaultReactNativeHost(this) {
                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                     List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    // packages.add(new ReactNativeFirebaseAppPackage());
                    // packages.add(new ReactNativeFirebaseAuthPackage());
                    // return new PackageList(this).getPackages();
                      return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    // return ".expo/.virtual-metro-entry";
                    return "index";
                }

                // @Override
                // protected boolean getUseDeveloperSupport() {
                //     return BuildConfig.DEBUG;
                // }

                // @Override
                protected Boolean isNewArchitectureEnabled() {
                    return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
                }

                // @Override
                // protected boolean isHermesEnabled() {
                //     return BuildConfig.IS_HERMES_ENABLED;
                // }
                protected Boolean isHermesEnabled() {
      return BuildConfig.IS_HERMES_ENABLED;
    }
            }
    ;

    // @Override
    // public ReactHost getReactHost() {
    //     return ReactNativeHostWrapper.createReactHost(getApplicationContext(), reactNativeHost);
    // }
    @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            DefaultNewArchitectureEntryPoint.load();
        }
        ApplicationLifecycleDispatcher.onApplicationCreate(this);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
    }
}

