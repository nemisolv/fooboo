package com.facebook.repository;

import com.facebook.entity.setting.Setting;
import com.facebook.entity.type.SettingCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SettingRepository extends JpaRepository<Setting,Long> {
    List<Setting> findByCategory(SettingCategory category);
}
