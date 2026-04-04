'use client';

import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

interface LocationPickerProps {
  label: string;
  description?: string;
  value?: Location;
  onChange: (location: Location) => void;
  error?: string;
  showMap?: boolean;
}

export function LocationPicker({
  label,
  description,
  value = { address: '' },
  onChange,
  error,
  showMap = false,
}: LocationPickerProps) {
  const t = useTranslations('common');
  const [address, setAddress] = useState(value.address);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onChange({ ...value, address: newAddress });
  };

  const handleUseCurrentLocation = () => {
    setIsSearching(true);
    // Simulate getting current location
    // In production, use navigator.geolocation
    setTimeout(() => {
      const mockLocation: Location = {
        address: address || t('locationPicker.currentLocation', 'Current Location'),
        latitude: 35.6892,
        longitude: 51.3890,
      };
      onChange(mockLocation);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>

      <div className="space-y-2">
        {/* Address input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('locationPicker.placeholder', 'Enter address or location')}
              value={address}
              onChange={handleAddressChange}
              className="ps-10"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleUseCurrentLocation}
            disabled={isSearching}
            title={t('locationPicker.useCurrent', 'Use current location')}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Map placeholder */}
        {showMap && (
          <div className="mt-4 border-2 border-dashed rounded-lg p-8 text-center bg-muted/20">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {t('locationPicker.mapPlaceholder', 'Map will be displayed here')}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('locationPicker.mapDescription', 'Integrate with MapLibre GL for interactive map')}
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
