
package com.facebook.service;


import com.facebook.entity.setting.Setting;
import com.facebook.util.EmailSettingBag;

import java.util.List;

public interface SettingService {
    EmailSettingBag listMailSettings();

    void updateSetting(List<Setting> settings);
}
