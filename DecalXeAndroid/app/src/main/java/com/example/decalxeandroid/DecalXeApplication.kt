package com.example.decalxeandroid

import android.app.Application
import timber.log.Timber

class DecalXeApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }
}
