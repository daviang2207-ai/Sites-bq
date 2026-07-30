/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 24 }: LucideIconProps) {
  // Safe lookup for the icon
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Fallback icon
    return <Icons.Shield className={className} size={size} id={`icon-fallback-${name}`} />;
  }

  return <IconComponent className={className} size={size} id={`icon-${name}`} />;
}
