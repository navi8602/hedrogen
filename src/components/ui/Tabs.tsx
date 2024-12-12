import * as React from 'react';

interface TabsContextValue {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, defaultValue, onValueChange, children }: TabsProps) {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);
  const currentValue = value !== undefined ? value : selectedTab;

  const handleChange = React.useCallback((newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setSelectedTab(newValue);
    }
  }, [onValueChange]);

  return (
    <TabsContext.Provider value={{ selectedValue: currentValue, onValueChange: handleChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-2 border-b border-gray-200">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const isSelected = context.selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(value)}
      className={`
        px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors
        ${isSelected 
          ? 'border-indigo-500 text-indigo-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
      `}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  return context.selectedValue === value ? <div>{children}</div> : null;
}