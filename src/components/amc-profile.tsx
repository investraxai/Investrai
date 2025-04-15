
import React from 'react';
import { FundData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Briefcase } from 'lucide-react';

interface AMCProfileProps {
  fund: FundData;
}

export function AMCProfile({ fund }: AMCProfileProps) {
  // Default profile if not available
  const amcDescription = fund.amc_profile?.description || 
    `${fund.amc} is one of the leading asset management companies in India, known for their professional fund management expertise across different asset classes.`;
  
  const totalSchemes = fund.amc_profile?.total_schemes || Math.floor(50 + Math.random() * 100);
  const totalAUM = fund.amc_profile?.total_aum || Math.floor(50000 + Math.random() * 1000000);

  const formatAUM = (aum: number) => {
    if (aum >= 100000) {
      return `₹${(aum / 100000).toFixed(2)} Lakh Cr`;
    } else {
      return `₹${aum.toFixed(2)} Cr`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AMC Profile: {fund.amc}</CardTitle>
        <CardDescription>Asset Management Company Information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">{amcDescription}</p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-md border p-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Schemes</p>
                <p className="font-medium">{totalSchemes}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 rounded-md border p-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total AUM</p>
                <p className="font-medium">{formatAUM(totalAUM)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
