package com.facebook.entity.setting;

import com.facebook.entity.type.SettingCategory;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "`key`")
    @EqualsAndHashCode.Include

    private String key;
    @Column(columnDefinition = "TEXT")
    private String value;

    @Enumerated(EnumType.STRING)
    private SettingCategory category;

    public Setting(String key) {
        this.key = key;
    }


}
