'use client'

import { ReactNode } from 'react';
import { Property } from '../property/types';

/**
 * Props for the SidebarHeader component
 */
export interface SidebarHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * Props for the NavItem component
 */
export interface NavItemProps {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  href?: string;
}

/**
 * Props for the Section component
 */
export interface SectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

/**
 * Props for the PropertySidebar component
 */
export interface PropertySidebarProps {
  onSelectProperty: (property: Property) => void;
  selectedProperty: Property | null;
  properties: Property[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

/**
 * Props for the RecentPropertiesSection component
 */
export interface RecentPropertiesSectionProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  onAddProperty: () => void;
  onViewAllProperties: () => void;
}