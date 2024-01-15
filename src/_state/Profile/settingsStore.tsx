import { create } from 'zustand';
import { SafetySettings } from '../../_types/SafetySettings';

interface ISettingsStore{
  safetySettings: SafetySettings;
  changeSafetySettings: (newSetting: SafetySettings) => void;
}

export const useSettingsStore = create<ISettingsStore>(set => ({
  safetySettings: SafetySettings.BLOCK_SOME,
  changeSafetySettings: (newSetting: SafetySettings) => set({ safetySettings: newSetting }),
}));