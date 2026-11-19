export type AdminBankAccount = {
  code: string;
  name: string;
  bankName: string;
  iban: string;
  currency: string;
  type: string;
  isActive: boolean;
};

export type AdminCurrencySetting = {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
  rounding: string;
  isActive: boolean;
  fxRate: number | null;
  fxSource: string | null;
  fxEffectiveDate: string | null;
};

export type AdminTaxRule = {
  code: string;
  name: string;
  kind: string;
  ratePercent: number;
  inclusion: string;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
};

export type AdminSettlementPolicy = {
  periodDays: number;
  minimumAmount: number;
  currency: string;
  dueDays: number;
};

export type AdminFinanceSettings = {
  bankAccounts: AdminBankAccount[];
  currencies: AdminCurrencySetting[];
  taxRules: AdminTaxRule[];
  settlement: AdminSettlementPolicy;
  updatedAt: string | null;
};

export type AdminFinanceSettingsInput = Omit<AdminFinanceSettings, "updatedAt">;
