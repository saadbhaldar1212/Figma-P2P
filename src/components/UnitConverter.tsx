import { useState, useCallback, useEffect } from 'react';
import { ArrowRightLeft, X, Sparkles, Moon, Sun, Copy, Check } from 'lucide-react';

type UnitMode = 'px' | 'em';
type Theme = 'light' | 'dark';
type ConversionType = 'pxToPercent' | 'percentToPx' | 'emToPercent' | 'percentToEm';

interface ConversionConfig {
  label: string;
  inputLabel: string;
  inputPlaceholder: string;
  baseLabel: string;
  convert: (value: number, base: number) => string;
  unit: UnitMode;
}

const conversions: Record<ConversionType, ConversionConfig> = {
  pxToPercent: {
    label: 'px → %',
    inputLabel: 'Pixel (px)',
    inputPlaceholder: 'Enter pixel value',
    baseLabel: 'Base font size (px)',
    convert: (px, base) => `${((px / base) * 100).toFixed(2)}%`,
    unit: 'px',
  },
  percentToPx: {
    label: '% → px',
    inputLabel: 'Percentage (%)',
    inputPlaceholder: 'Enter percentage',
    baseLabel: 'Base font size (px)',
    convert: (percent, base) => `${((percent / 100) * base).toFixed(2)} px`,
    unit: 'px',
  },
  emToPercent: {
    label: 'em → %',
    inputLabel: 'Em (em)',
    inputPlaceholder: 'Enter em value',
    baseLabel: 'Base font size (px)',
    convert: (em, base) => `${((em * 16 / base) * 100).toFixed(2)}%`,
    unit: 'em',
  },
  percentToEm: {
    label: '% → em',
    inputLabel: 'Percentage (%)',
    inputPlaceholder: 'Enter percentage',
    baseLabel: 'Base font size (px)',
    convert: (percent, base) => `${((percent / 100) * base / 16).toFixed(2)} em`,
    unit: 'em',
  },
};

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function InputField({ label, value, onChange, placeholder }: InputFieldProps) {
  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative group">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-modern pr-10"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function UnitConverter() {
  const [unitMode, setUnitMode] = useState<UnitMode>('px');
  const [activeTab, setActiveTab] = useState<ConversionType>('pxToPercent');
  const [inputValue, setInputValue] = useState('');
  const [baseValue, setBaseValue] = useState('16');
  const [theme, setTheme] = useState<Theme>('light');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const availableTabs = (Object.entries(conversions) as [ConversionType, ConversionConfig][])
    .filter(([, config]) => config.unit === unitMode);

  const handleUnitModeChange = (mode: UnitMode) => {
    setUnitMode(mode);
    setActiveTab(mode === 'px' ? 'pxToPercent' : 'emToPercent');
    setInputValue('');
  };

  const currentConfig = conversions[activeTab];
  const result = inputValue && baseValue
    ? currentConfig.convert(parseFloat(inputValue), parseFloat(baseValue))
    : null;

  const handleCopyResult = async () => {
    if (result) {
      // Extract only the numeric value without units
      const numericValue = result.replace(/[^0-9.-]/g, '');
      await navigator.clipboard.writeText(numericValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <ArrowRightLeft className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="gradient-text">CSS Unit</span> Converter
          </h1>
          <p className="mt-2 text-muted-foreground">
            Convert between px, em, and percentages with ease
          </p>
        </header>

        {/* Main Card */}
        <div className="card-elevated p-6 sm:p-8">
          {/* Unit Mode Toggle + Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex p-1 rounded-xl bg-secondary">
              {(['px', 'em'] as UnitMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleUnitModeChange(mode)}
                  className={`px-6 py-2 rounded-lg font-medium text-sm ${
                    unitMode === mode
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {mode.toUpperCase()} Mode
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {availableTabs.map(([key, config]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setInputValue('');
                }}
                className={`tab-pill whitespace-nowrap flex-1 ${activeTab === key ? 'active' : ''}`}
              >
                {config.label}
              </button>
            ))}
          </div>

          {/* Mobile Dropdown (shown on small screens) */}
          <div className="sm:hidden mb-6">
            <select
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value as ConversionType);
                setInputValue('');
              }}
              className="input-modern"
            >
              {availableTabs.map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conversion Panel */}
          <div className="space-y-5 animate-fade-in" key={activeTab}>
            <InputField
              label={currentConfig.inputLabel}
              value={inputValue}
              onChange={setInputValue}
              placeholder={currentConfig.inputPlaceholder}
            />

            <InputField
              label={currentConfig.baseLabel}
              value={baseValue}
              onChange={setBaseValue}
              placeholder="16"
            />

            {/* Result Display */}
            <div className="result-display">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Result</span>
                </div>
                {result && (
                  <button
                    onClick={handleCopyResult}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                )}
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono gradient-text">
                {result || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm text-muted-foreground">
          <p>Built for developers who love clean CSS</p>
        </footer>
      </div>
    </div>
  );
}
