package com.facebook.service.impl;

import com.facebook.entity.setting.Setting;
import com.facebook.entity.type.SettingCategory;
import com.facebook.repository.SettingRepository;
import com.facebook.service.SettingService;
import com.facebook.util.EmailSettingBag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SettingServiceImpl implements SettingService {

    private final SettingRepository settingRepo;
    @Override
    public EmailSettingBag listMailSettings() {
        List<Setting> mailsSetting = settingRepo.findByCategory(SettingCategory.MAIL_SERVER);
//        mailsSetting.addAll(settingRepo.findByCategory(SettingCategory.MAIL_TEMPLATE));
        return new EmailSettingBag(mailsSetting);
    }

    @Override
    public void updateSetting(List<Setting> settings) {
        settingRepo.saveAll(settings);
    }
}
