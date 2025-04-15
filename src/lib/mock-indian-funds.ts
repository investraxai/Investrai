
import { FundData } from "./types";

// Mock data for 50 Indian mutual funds
export const indianMutualFunds: FundData[] = [
  {
    id: "HDFC001",
    scheme_name: "HDFC Top 100 Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC001",
    nav: 825.67,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.75,
    aum: 21548.32,
    aum_category: "Large",
    returns: {
      "1Y": 18.45,
      "3Y": 15.32,
      "5Y": 12.76
    },
    risk_rating: 4,
    inception_date: "2000-10-11",
    fund_manager: "Prashant Jain",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI001",
    scheme_name: "ICICI Prudential Bluechip Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI001",
    nav: 65.28,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.82,
    aum: 32654.87,
    aum_category: "Large",
    returns: {
      "1Y": 17.89,
      "3Y": 14.56,
      "5Y": 11.98
    },
    risk_rating: 4,
    inception_date: "2008-05-23",
    fund_manager: "Anish Tawakley",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "SBI001",
    scheme_name: "SBI Blue Chip Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI001",
    nav: 52.75,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.78,
    aum: 28965.43,
    aum_category: "Large",
    returns: {
      "1Y": 16.92,
      "3Y": 14.12,
      "5Y": 11.43
    },
    risk_rating: 4,
    inception_date: "2006-02-14",
    fund_manager: "Sohini Andani",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "AXIS001",
    scheme_name: "Axis Bluechip Fund",
    amc: "Axis Mutual Fund",
    scheme_code: "AXIS001",
    nav: 42.65,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.65,
    aum: 18754.21,
    aum_category: "Large",
    returns: {
      "1Y": 15.87,
      "3Y": 13.45,
      "5Y": 12.01
    },
    risk_rating: 4,
    inception_date: "2009-01-05",
    fund_manager: "Shreyash Devalkar",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "KOTAK001",
    scheme_name: "Kotak Bluechip Fund",
    amc: "Kotak Mahindra",
    scheme_code: "KOTAK001",
    nav: 356.87,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.69,
    aum: 16542.32,
    aum_category: "Large",
    returns: {
      "1Y": 16.54,
      "3Y": 13.89,
      "5Y": 11.76
    },
    risk_rating: 4,
    inception_date: "1998-12-29",
    fund_manager: "Harsha Upadhyaya",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "HDFC002",
    scheme_name: "HDFC Mid-Cap Opportunities Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC002",
    nav: 86.54,
    category: "Equity",
    sub_category: "Mid Cap",
    expense_ratio: 1.91,
    aum: 15478.65,
    aum_category: "Large",
    returns: {
      "1Y": 22.45,
      "3Y": 18.21,
      "5Y": 14.32
    },
    risk_rating: 5,
    inception_date: "2007-06-25",
    fund_manager: "Chirag Setalvad",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI002",
    scheme_name: "ICICI Prudential Midcap Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI002",
    nav: 129.87,
    category: "Equity",
    sub_category: "Mid Cap",
    expense_ratio: 1.94,
    aum: 13245.76,
    aum_category: "Large",
    returns: {
      "1Y": 21.76,
      "3Y": 17.54,
      "5Y": 13.87
    },
    risk_rating: 5,
    inception_date: "2004-10-28",
    fund_manager: "Atul Patel",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "SBI002",
    scheme_name: "SBI Magnum Midcap Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI002",
    nav: 112.65,
    category: "Equity",
    sub_category: "Mid Cap",
    expense_ratio: 1.88,
    aum: 11987.54,
    aum_category: "Large",
    returns: {
      "1Y": 20.54,
      "3Y": 16.87,
      "5Y": 13.54
    },
    risk_rating: 5,
    inception_date: "2005-03-09",
    fund_manager: "R. Srinivasan",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "AXIS002",
    scheme_name: "Axis Midcap Fund",
    amc: "Axis Mutual Fund",
    scheme_code: "AXIS002",
    nav: 58.98,
    category: "Equity",
    sub_category: "Mid Cap",
    expense_ratio: 1.87,
    aum: 9876.54,
    aum_category: "Mid",
    returns: {
      "1Y": 23.54,
      "3Y": 19.87,
      "5Y": 15.65
    },
    risk_rating: 5,
    inception_date: "2011-02-18",
    fund_manager: "Shreyash Devalkar",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "KOTAK002",
    scheme_name: "Kotak Emerging Equity Fund",
    amc: "Kotak Mahindra",
    scheme_code: "KOTAK002",
    nav: 65.43,
    category: "Equity",
    sub_category: "Mid Cap",
    expense_ratio: 1.86,
    aum: 8765.43,
    aum_category: "Mid",
    returns: {
      "1Y": 22.87,
      "3Y": 18.76,
      "5Y": 14.98
    },
    risk_rating: 5,
    inception_date: "2007-03-30",
    fund_manager: "Pankaj Tibrewal",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "HDFC003",
    scheme_name: "HDFC Small Cap Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC003",
    nav: 62.43,
    category: "Equity",
    sub_category: "Small Cap",
    expense_ratio: 2.05,
    aum: 7654.32,
    aum_category: "Mid",
    returns: {
      "1Y": 26.54,
      "3Y": 21.76,
      "5Y": 16.87
    },
    risk_rating: 5,
    inception_date: "2008-04-03",
    fund_manager: "Chirag Setalvad",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI003",
    scheme_name: "ICICI Prudential Smallcap Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI003",
    nav: 48.76,
    category: "Equity",
    sub_category: "Small Cap",
    expense_ratio: 2.10,
    aum: 6543.21,
    aum_category: "Mid",
    returns: {
      "1Y": 25.87,
      "3Y": 20.54,
      "5Y": 15.76
    },
    risk_rating: 5,
    inception_date: "2010-01-12",
    fund_manager: "Mrinal Singh",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "SBI003",
    scheme_name: "SBI Small Cap Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI003",
    nav: 82.43,
    category: "Equity",
    sub_category: "Small Cap",
    expense_ratio: 2.00,
    aum: 8765.43,
    aum_category: "Mid",
    returns: {
      "1Y": 28.76,
      "3Y": 23.54,
      "5Y": 18.98
    },
    risk_rating: 5,
    inception_date: "2009-09-10",
    fund_manager: "R. Srinivasan",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "NIPPON001",
    scheme_name: "Nippon India Small Cap Fund",
    amc: "Nippon India",
    scheme_code: "NIPPON001",
    nav: 72.65,
    category: "Equity",
    sub_category: "Small Cap",
    expense_ratio: 1.98,
    aum: 7654.32,
    aum_category: "Mid",
    returns: {
      "1Y": 29.87,
      "3Y": 24.65,
      "5Y": 19.76
    },
    risk_rating: 5,
    inception_date: "2010-09-16",
    fund_manager: "Samir Rachh",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ABSL001",
    scheme_name: "Aditya Birla Sun Life Small Cap Fund",
    amc: "Aditya Birla Sun Life",
    scheme_code: "ABSL001",
    nav: 52.43,
    category: "Equity",
    sub_category: "Small Cap",
    expense_ratio: 2.02,
    aum: 6543.21,
    aum_category: "Mid",
    returns: {
      "1Y": 27.54,
      "3Y": 22.87,
      "5Y": 17.65
    },
    risk_rating: 5,
    inception_date: "2009-05-31",
    fund_manager: "Jayesh Gandhi",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "HDFC004",
    scheme_name: "HDFC Balanced Advantage Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC004",
    nav: 243.76,
    category: "Hybrid",
    sub_category: "Balanced Advantage",
    expense_ratio: 1.65,
    aum: 43567.87,
    aum_category: "Large",
    returns: {
      "1Y": 14.32,
      "3Y": 12.76,
      "5Y": 10.54
    },
    risk_rating: 3,
    inception_date: "1994-02-01",
    fund_manager: "Prashant Jain",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI004",
    scheme_name: "ICICI Prudential Balanced Advantage Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI004",
    nav: 48.65,
    category: "Hybrid",
    sub_category: "Balanced Advantage",
    expense_ratio: 1.68,
    aum: 38765.43,
    aum_category: "Large",
    returns: {
      "1Y": 13.87,
      "3Y": 11.98,
      "5Y": 9.87
    },
    risk_rating: 3,
    inception_date: "2006-12-30",
    fund_manager: "Sankaran Naren",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "HDFC005",
    scheme_name: "HDFC Low Duration Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC005",
    nav: 45.32,
    category: "Debt",
    sub_category: "Low Duration",
    expense_ratio: 0.85,
    aum: 23456.78,
    aum_category: "Large",
    returns: {
      "1Y": 6.78,
      "3Y": 7.12,
      "5Y": 7.65
    },
    risk_rating: 2,
    inception_date: "2000-12-10",
    fund_manager: "Anil Bamboli",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "0.25% if redeemed within 1 month"
  },
  {
    id: "ICICI005",
    scheme_name: "ICICI Prudential Liquid Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI005",
    nav: 315.67,
    category: "Debt",
    sub_category: "Liquid",
    expense_ratio: 0.45,
    aum: 54321.98,
    aum_category: "Large",
    returns: {
      "1Y": 5.87,
      "3Y": 6.43,
      "5Y": 6.98
    },
    risk_rating: 1,
    inception_date: "2001-01-17",
    fund_manager: "Aditya Iyer",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "Nil"
  },
  {
    id: "SBI004",
    scheme_name: "SBI Magnum Ultra Short Duration Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI004",
    nav: 4671.23,
    category: "Debt",
    sub_category: "Ultra Short Duration",
    expense_ratio: 0.67,
    aum: 32165.43,
    aum_category: "Large",
    returns: {
      "1Y": 6.54,
      "3Y": 7.21,
      "5Y": 7.76
    },
    risk_rating: 2,
    inception_date: "2003-05-09",
    fund_manager: "Rajeev Radhakrishnan",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "Nil"
  },
  {
    id: "MIRAE001",
    scheme_name: "Mirae Asset Large Cap Fund",
    amc: "Mirae Asset",
    scheme_code: "MIRAE001",
    nav: 71.23,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.58,
    aum: 29876.54,
    aum_category: "Large",
    returns: {
      "1Y": 18.76,
      "3Y": 15.87,
      "5Y": 13.54
    },
    risk_rating: 4,
    inception_date: "2008-04-04",
    fund_manager: "Neelesh Surana",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ABSL002",
    scheme_name: "Aditya Birla Sun Life Frontline Equity Fund",
    amc: "Aditya Birla Sun Life",
    scheme_code: "ABSL002",
    nav: 279.65,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.76,
    aum: 25432.10,
    aum_category: "Large",
    returns: {
      "1Y": 17.54,
      "3Y": 14.32,
      "5Y": 11.87
    },
    risk_rating: 4,
    inception_date: "2002-08-30",
    fund_manager: "Mahesh Patil",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "DSP001",
    scheme_name: "DSP Top 100 Equity Fund",
    amc: "DSP",
    scheme_code: "DSP001",
    nav: 256.87,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.72,
    aum: 19876.54,
    aum_category: "Large",
    returns: {
      "1Y": 16.43,
      "3Y": 13.76,
      "5Y": 11.32
    },
    risk_rating: 4,
    inception_date: "2003-03-28",
    fund_manager: "Vinit Sambre",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "INVESCO001",
    scheme_name: "Invesco India Large Cap Fund",
    amc: "Invesco",
    scheme_code: "INVESCO001",
    nav: 42.76,
    category: "Equity",
    sub_category: "Large Cap",
    expense_ratio: 1.81,
    aum: 15432.10,
    aum_category: "Large",
    returns: {
      "1Y": 15.76,
      "3Y": 12.98,
      "5Y": 10.76
    },
    risk_rating: 4,
    inception_date: "2009-08-24",
    fund_manager: "Amit Ganatra",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "UTI001",
    scheme_name: "UTI Nifty Index Fund",
    amc: "UTI",
    scheme_code: "UTI001",
    nav: 112.43,
    category: "Equity",
    sub_category: "Index Fund",
    expense_ratio: 0.45,
    aum: 18765.43,
    aum_category: "Large",
    returns: {
      "1Y": 16.54,
      "3Y": 13.87,
      "5Y": 11.54
    },
    risk_rating: 4,
    inception_date: "2000-03-10",
    fund_manager: "Sharwan Kumar Goyal",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "Nil"
  },
  {
    id: "HDFC006",
    scheme_name: "HDFC Index Fund-NIFTY 50 Plan",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC006",
    nav: 148.76,
    category: "Equity",
    sub_category: "Index Fund",
    expense_ratio: 0.42,
    aum: 16543.21,
    aum_category: "Large",
    returns: {
      "1Y": 16.32,
      "3Y": 13.76,
      "5Y": 11.43
    },
    risk_rating: 4,
    inception_date: "2002-07-17",
    fund_manager: "Krishan Kumar Daga",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "Nil"
  },
  {
    id: "AXIS003",
    scheme_name: "Axis Long Term Equity Fund",
    amc: "Axis Mutual Fund",
    scheme_code: "AXIS003",
    nav: 65.43,
    category: "Equity",
    sub_category: "ELSS",
    expense_ratio: 1.74,
    aum: 29876.54,
    aum_category: "Large",
    returns: {
      "1Y": 19.87,
      "3Y": 16.54,
      "5Y": 14.32
    },
    risk_rating: 4,
    inception_date: "2009-12-29",
    fund_manager: "Jinesh Gopani",
    min_sip_amount: 500,
    min_lumpsum: 500,
    exit_load: "Nil (3-year lock-in as per ELSS guidelines)"
  },
  {
    id: "MIRAE002",
    scheme_name: "Mirae Asset Tax Saver Fund",
    amc: "Mirae Asset",
    scheme_code: "MIRAE002",
    nav: 29.87,
    category: "Equity",
    sub_category: "ELSS",
    expense_ratio: 1.68,
    aum: 12345.67,
    aum_category: "Large",
    returns: {
      "1Y": 20.54,
      "3Y": 17.65,
      "5Y": 15.43
    },
    risk_rating: 4,
    inception_date: "2015-12-28",
    fund_manager: "Neelesh Surana",
    min_sip_amount: 500,
    min_lumpsum: 500,
    exit_load: "Nil (3-year lock-in as per ELSS guidelines)"
  },
  {
    id: "SBI005",
    scheme_name: "SBI Corporate Bond Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI005",
    nav: 34.76,
    category: "Debt",
    sub_category: "Corporate Bond",
    expense_ratio: 0.65,
    aum: 25678.90,
    aum_category: "Large",
    returns: {
      "1Y": 7.65,
      "3Y": 8.21,
      "5Y": 8.76
    },
    risk_rating: 2,
    inception_date: "2009-12-28",
    fund_manager: "Rajeev Radhakrishnan",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "0.5% if redeemed within 6 months"
  },
  {
    id: "KOTAK003",
    scheme_name: "Kotak Banking and PSU Debt Fund",
    amc: "Kotak Mahindra",
    scheme_code: "KOTAK003",
    nav: 52.43,
    category: "Debt",
    sub_category: "Banking & PSU",
    expense_ratio: 0.45,
    aum: 16543.21,
    aum_category: "Large",
    returns: {
      "1Y": 7.32,
      "3Y": 7.89,
      "5Y": 8.45
    },
    risk_rating: 2,
    inception_date: "2013-12-13",
    fund_manager: "Deepak Agrawal",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "Nil"
  },
  {
    id: "ABSL003",
    scheme_name: "Aditya Birla Sun Life Dynamic Bond Fund",
    amc: "Aditya Birla Sun Life",
    scheme_code: "ABSL003",
    nav: 37.65,
    category: "Debt",
    sub_category: "Dynamic Bond",
    expense_ratio: 1.05,
    aum: 12345.67,
    aum_category: "Large",
    returns: {
      "1Y": 8.76,
      "3Y": 8.21,
      "5Y": 8.54
    },
    risk_rating: 3,
    inception_date: "2004-09-27",
    fund_manager: "Maneesh Dangi",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "0.5% if redeemed within 6 months"
  },
  {
    id: "HDFC007",
    scheme_name: "HDFC Multi-Asset Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC007",
    nav: 45.76,
    category: "Hybrid",
    sub_category: "Multi Asset Allocation",
    expense_ratio: 1.85,
    aum: 8765.43,
    aum_category: "Mid",
    returns: {
      "1Y": 12.87,
      "3Y": 11.54,
      "5Y": 9.87
    },
    risk_rating: 3,
    inception_date: "2011-12-10",
    fund_manager: "Chirag Setalvad",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI006",
    scheme_name: "ICICI Prudential Multi-Asset Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI006",
    nav: 387.65,
    category: "Hybrid",
    sub_category: "Multi Asset Allocation",
    expense_ratio: 1.92,
    aum: 12345.67,
    aum_category: "Large",
    returns: {
      "1Y": 13.54,
      "3Y": 12.87,
      "5Y": 10.65
    },
    risk_rating: 3,
    inception_date: "2002-10-31",
    fund_manager: "Sankaran Naren",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "TATA001",
    scheme_name: "Tata Digital India Fund",
    amc: "Tata Mutual Fund",
    scheme_code: "TATA001",
    nav: 37.65,
    category: "Equity",
    sub_category: "Sectoral",
    expense_ratio: 2.15,
    aum: 7654.32,
    aum_category: "Mid",
    returns: {
      "1Y": 24.87,
      "3Y": 26.54,
      "5Y": 21.65
    },
    risk_rating: 5,
    inception_date: "2015-12-28",
    fund_manager: "Sarvesh Gupta",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI007",
    scheme_name: "ICICI Prudential Technology Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI007",
    nav: 124.87,
    category: "Equity",
    sub_category: "Sectoral",
    expense_ratio: 2.10,
    aum: 8765.43,
    aum_category: "Mid",
    returns: {
      "1Y": 26.54,
      "3Y": 28.76,
      "5Y": 23.54
    },
    risk_rating: 5,
    inception_date: "2000-03-31",
    fund_manager: "Sankaran Naren",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "SBI006",
    scheme_name: "SBI Healthcare Opportunities Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI006",
    nav: 172.43,
    category: "Equity",
    sub_category: "Sectoral",
    expense_ratio: 2.05,
    aum: 6543.21,
    aum_category: "Mid",
    returns: {
      "1Y": 22.43,
      "3Y": 20.76,
      "5Y": 18.54
    },
    risk_rating: 5,
    inception_date: "2004-07-05",
    fund_manager: "Tanmaya Desai",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "ICICI008",
    scheme_name: "ICICI Prudential Retirement Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI008",
    nav: 28.76,
    category: "Solution Oriented",
    sub_category: "Retirement Fund",
    expense_ratio: 1.95,
    aum: 5432.10,
    aum_category: "Mid",
    returns: {
      "1Y": 15.76,
      "3Y": 13.54,
      "5Y": 11.87
    },
    risk_rating: 3,
    inception_date: "2015-02-19",
    fund_manager: "Sankaran Naren",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed before age 60"
  },
  {
    id: "HDFC008",
    scheme_name: "HDFC Retirement Savings Fund",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC008",
    nav: 25.43,
    category: "Solution Oriented",
    sub_category: "Retirement Fund",
    expense_ratio: 1.92,
    aum: 4321.09,
    aum_category: "Small",
    returns: {
      "1Y": 16.54,
      "3Y": 14.32,
      "5Y": 12.76
    },
    risk_rating: 3,
    inception_date: "2016-02-19",
    fund_manager: "Prashant Jain",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed before age 60"
  },
  {
    id: "SBI007",
    scheme_name: "SBI Magnum Children's Benefit Fund",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI007",
    nav: 23.54,
    category: "Solution Oriented",
    sub_category: "Children's Fund",
    expense_ratio: 1.87,
    aum: 3210.98,
    aum_category: "Small",
    returns: {
      "1Y": 14.32,
      "3Y": 12.76,
      "5Y": 10.98
    },
    risk_rating: 3,
    inception_date: "2014-11-25",
    fund_manager: "R. Srinivasan",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed before lock-in period"
  },
  {
    id: "ICICI009",
    scheme_name: "ICICI Prudential Child Care Fund",
    amc: "ICICI Prudential",
    scheme_code: "ICICI009",
    nav: 175.43,
    category: "Solution Oriented",
    sub_category: "Children's Fund",
    expense_ratio: 1.89,
    aum: 4567.89,
    aum_category: "Small",
    returns: {
      "1Y": 15.43,
      "3Y": 13.87,
      "5Y": 11.76
    },
    risk_rating: 3,
    inception_date: "2001-08-31",
    fund_manager: "Sankaran Naren",
    min_sip_amount: 100,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed before lock-in period"
  },
  {
    id: "UTI002",
    scheme_name: "UTI Nifty Next 50 Index Fund",
    amc: "UTI",
    scheme_code: "UTI002",
    nav: 13.76,
    category: "Equity",
    sub_category: "Index Fund",
    expense_ratio: 0.42,
    aum: 7654.32,
    aum_category: "Mid",
    returns: {
      "1Y": 18.76,
      "3Y": 15.43,
      "5Y": 12.87
    },
    risk_rating: 4,
    inception_date: "2012-07-25",
    fund_manager: "Sharwan Kumar Goyal",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "Nil"
  },
  {
    id: "SBI008",
    scheme_name: "SBI ETF Nifty 50",
    amc: "SBI Mutual Fund",
    scheme_code: "SBI008",
    nav: 153.62,
    category: "Equity",
    sub_category: "ETF",
    expense_ratio: 0.07,
    aum: 98765.43,
    aum_category: "Large",
    returns: {
      "1Y": 16.43,
      "3Y": 13.87,
      "5Y": 11.65
    },
    risk_rating: 4,
    inception_date: "2015-07-21",
    fund_manager: "Jayesh Shroff",
    min_sip_amount: 0,
    min_lumpsum: 0,
    exit_load: "Nil"
  },
  {
    id: "HDFC009",
    scheme_name: "HDFC Gold ETF",
    amc: "HDFC Mutual Fund",
    scheme_code: "HDFC009",
    nav: 4213.87,
    category: "Other",
    sub_category: "ETF",
    expense_ratio: 0.59,
    aum: 2345.67,
    aum_category: "Small",
    returns: {
      "1Y": 8.76,
      "3Y": 12.43,
      "5Y": 10.87
    },
    risk_rating: 3,
    inception_date: "2010-08-24",
    fund_manager: "Krishan Kumar Daga",
    min_sip_amount: 0,
    min_lumpsum: 0,
    exit_load: "Nil"
  },
  {
    id: "NIPPON002",
    scheme_name: "Nippon India ETF Sensex",
    amc: "Nippon India",
    scheme_code: "NIPPON002",
    nav: 512.87,
    category: "Equity",
    sub_category: "ETF",
    expense_ratio: 0.16,
    aum: 6789.01,
    aum_category: "Mid",
    returns: {
      "1Y": 15.76,
      "3Y": 13.21,
      "5Y": 11.43
    },
    risk_rating: 4,
    inception_date: "2008-09-18",
    fund_manager: "Vishal Jain",
    min_sip_amount: 0,
    min_lumpsum: 0,
    exit_load: "Nil"
  },
  {
    id: "ICICI010",
    scheme_name: "ICICI Prudential Nifty ETF",
    amc: "ICICI Prudential",
    scheme_code: "ICICI010",
    nav: 158.43,
    category: "Equity",
    sub_category: "ETF",
    expense_ratio: 0.05,
    aum: 7890.12,
    aum_category: "Mid",
    returns: {
      "1Y": 16.32,
      "3Y": 13.76,
      "5Y": 11.54
    },
    risk_rating: 4,
    inception_date: "2013-03-20",
    fund_manager: "Kayzad Eghlim",
    min_sip_amount: 0,
    min_lumpsum: 0,
    exit_load: "Nil"
  },
  {
    id: "AXIS004",
    scheme_name: "Axis Gold ETF",
    amc: "Axis Mutual Fund",
    scheme_code: "AXIS004",
    nav: 4532.76,
    category: "Other",
    sub_category: "ETF",
    expense_ratio: 0.65,
    aum: 1234.56,
    aum_category: "Small",
    returns: {
      "1Y": 9.01,
      "3Y": 12.87,
      "5Y": 11.32
    },
    risk_rating: 3,
    inception_date: "2010-11-10",
    fund_manager: "Ashish Naik",
    min_sip_amount: 0,
    min_lumpsum: 0,
    exit_load: "Nil"
  },
  {
    id: "AXIS005",
    scheme_name: "Axis Focused 25 Fund",
    amc: "Axis Mutual Fund",
    scheme_code: "AXIS005",
    nav: 42.87,
    category: "Equity",
    sub_category: "Focused",
    expense_ratio: 1.82,
    aum: 18765.43,
    aum_category: "Large",
    returns: {
      "1Y": 19.87,
      "3Y": 17.43,
      "5Y": 15.21
    },
    risk_rating: 4,
    inception_date: "2012-06-29",
    fund_manager: "Jinesh Gopani",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "NIPPON003",
    scheme_name: "Nippon India Focused Equity Fund",
    amc: "Nippon India",
    scheme_code: "NIPPON003",
    nav: 54.32,
    category: "Equity",
    sub_category: "Focused",
    expense_ratio: 1.78,
    aum: 8765.43,
    aum_category: "Mid",
    returns: {
      "1Y": 20.43,
      "3Y": 18.76,
      "5Y": 16.54
    },
    risk_rating: 4,
    inception_date: "2005-09-28",
    fund_manager: "Vinay Sharma",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "DSP002",
    scheme_name: "DSP Focus Fund",
    amc: "DSP",
    scheme_code: "DSP002",
    nav: 31.87,
    category: "Equity",
    sub_category: "Focused",
    expense_ratio: 1.85,
    aum: 7654.32,
    aum_category: "Mid",
    returns: {
      "1Y": 18.76,
      "3Y": 16.54,
      "5Y": 14.32
    },
    risk_rating: 4,
    inception_date: "2010-06-10",
    fund_manager: "Rohit Singhania",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  },
  {
    id: "MIRAE003",
    scheme_name: "Mirae Asset Focused Fund",
    amc: "Mirae Asset",
    scheme_code: "MIRAE003",
    nav: 19.54,
    category: "Equity",
    sub_category: "Focused",
    expense_ratio: 1.76,
    aum: 6543.21,
    aum_category: "Mid",
    returns: {
      "1Y": 21.76,
      "3Y": 19.87,
      "5Y": 0
    },
    risk_rating: 4,
    inception_date: "2019-05-23",
    fund_manager: "Neelesh Surana",
    min_sip_amount: 500,
    min_lumpsum: 5000,
    exit_load: "1% if redeemed within 1 year"
  }
];

// Helper function to get unique AMCs from the funds data
export function getAllAMCs(): string[] {
  const uniqueAMCs = new Set<string>();
  indianMutualFunds.forEach(fund => uniqueAMCs.add(fund.amc));
  return Array.from(uniqueAMCs).sort();
}

// Filter funds based on the provided filters
export function filterFunds(filters?: FundFilters): FundData[] {
  let filteredFunds = [...indianMutualFunds];

  if (!filters) return filteredFunds;

  // Filter by fundIds (comma-separated list of IDs)
  if (filters.fundIds) {
    const idList = filters.fundIds.split(',');
    filteredFunds = filteredFunds.filter(fund => idList.includes(fund.id));
    return filteredFunds; // Early return for specific fund IDs
  }

  // Filter by category
  if (filters.category) {
    filteredFunds = filteredFunds.filter(fund => fund.category === filters.category);
  }

  // Filter by AMC
  if (filters.amc) {
    filteredFunds = filteredFunds.filter(fund => fund.amc === filters.amc);
  }

  // Filter by returns
  if (filters.minReturn1Y !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.returns["1Y"] >= filters.minReturn1Y!);
  }
  if (filters.maxReturn1Y !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.returns["1Y"] <= filters.maxReturn1Y!);
  }
  if (filters.minReturn3Y !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.returns["3Y"] >= filters.minReturn3Y!);
  }
  if (filters.maxReturn3Y !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.returns["3Y"] <= filters.maxReturn3Y!);
  }
  if (filters.minReturn5Y !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.returns["5Y"] >= filters.minReturn5Y!);
  }
  if (filters.maxReturn5Y !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.returns["5Y"] <= filters.maxReturn5Y!);
  }

  // Filter by expense ratio
  if (filters.minExpenseRatio !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.expense_ratio >= filters.minExpenseRatio!);
  }
  if (filters.maxExpenseRatio !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.expense_ratio <= filters.maxExpenseRatio!);
  }

  // Filter by AUM
  if (filters.minAUM !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.aum >= filters.minAUM!);
  }
  if (filters.maxAUM !== undefined) {
    filteredFunds = filteredFunds.filter(fund => fund.aum <= filters.maxAUM!);
  }

  // Filter by AUM category
  if (filters.aumCategory) {
    filteredFunds = filteredFunds.filter(fund => fund.aum_category === filters.aumCategory);
  }

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredFunds = filteredFunds.filter(fund => 
      fund.scheme_name.toLowerCase().includes(query) || 
      fund.amc.toLowerCase().includes(query)
    );
  }

  return filteredFunds;
}
