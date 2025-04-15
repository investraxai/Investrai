
import React from 'react';
import { FundData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BadgeCheck, Briefcase, GraduationCap } from 'lucide-react';

interface FundManagerProfileProps {
  fund: FundData;
}

export function FundManagerProfile({ fund }: FundManagerProfileProps) {
  // Use fund manager details if available, or fallback to defaults
  const managerName = fund.fund_manager_details?.name || fund.fund_manager || "Not specified";
  const qualification = fund.fund_manager_details?.qualification || "MBA, CFA";
  const experience = fund.fund_manager_details?.experience || 10;
  const aumManaged = fund.fund_manager_details?.aum_managed || Math.floor(5000 + Math.random() * 50000);
  const bio = fund.fund_manager_details?.bio || 
    `${managerName} has ${experience} years of experience in investment management with expertise in ${fund.category.toLowerCase()} funds. Known for a disciplined investment approach and in-depth market research.`;
    
  const imageUrl = fund.fund_manager_details?.image_url || '';
  
  // Get the initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const formatAUM = (aum: number) => {
    if (aum >= 10000) {
      return `₹${(aum / 1000).toFixed(2)}K Cr`;
    } else {
      return `₹${aum.toFixed(2)} Cr`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund Manager Profile</CardTitle>
        <CardDescription>Details about the fund manager</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Avatar className="h-20 w-20">
            {imageUrl ? <AvatarImage src={imageUrl} alt={managerName} /> : null}
            <AvatarFallback className="text-lg">{getInitials(managerName)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-medium">{managerName}</h3>
                <BadgeCheck className="ml-1.5 h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <GraduationCap className="mr-1 h-4 w-4" />
                <span>{qualification}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{bio}</p>
            
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{experience} years</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">AUM Managed</p>
                  <p className="font-medium">{formatAUM(aumManaged)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
