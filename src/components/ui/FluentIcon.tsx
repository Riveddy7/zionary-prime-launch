import React from 'react';
import {
  DesignIdeas24Regular,
  DataTrending24Regular,
  Mail24Regular,
  Phone24Regular,
  Play24Regular,
  ArrowRight24Regular,
  Checkmark24Regular,
  Warning24Regular,
  Info24Regular,
  Star24Regular,
  Location24Regular,
  Clock24Regular,
  People24Regular,
  Settings24Regular,
  Lightbulb24Regular,
  DataBarVertical24Regular,
  BookCompass24Regular,
  Toolbox24Regular,
  Box24Regular,
  Document24Regular,
  Wrench24Regular,
  Dismiss24Regular,
  Navigation24Regular,
  Home24Regular
} from "@fluentui/react-icons";

// Mapeo de iconos para componentes
const fluentIcons = {
  // Iconos de sección
  architecture: DesignIdeas24Regular,
  growth: DataTrending24Regular,
  contact: Mail24Regular,
  phone: Phone24Regular,
  play: Play24Regular,
  
  // Iconos de navegación
  arrowRight: ArrowRight24Regular,
  checkmark: Checkmark24Regular,
  warning: Warning24Regular,
  info: Info24Regular,
  star: Star24Regular,
  menu: Navigation24Regular,
  home: Home24Regular,
  close: Dismiss24Regular,
  
  // Iconos de información
  location: Location24Regular,
  clock: Clock24Regular,
  people: People24Regular,
  settings: Settings24Regular,
  lightbulb: Lightbulb24Regular,
  
  // Iconos de problema/solución
  chartDown: DataBarVertical24Regular,
  compass: BookCompass24Regular,
  hammer: Toolbox24Regular,
  package: Box24Regular,
  
  // Iconos de servicios
  fileText: Document24Regular,
  gear: Wrench24Regular,
};

interface FluentIconProps {
  icon: keyof typeof fluentIcons;
  size?: number;
  color?: string;
  className?: string;
}

const FluentIcon: React.FC<FluentIconProps> = ({ 
  icon, 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => {
  const IconComponent = fluentIcons[icon];
  
  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in FluentIcon component`);
    return null;
  }
  
  return (
    <IconComponent 
      style={{ 
        width: size, 
        height: size, 
        color 
      }} 
      className={className}
    />
  );
};

export default FluentIcon;