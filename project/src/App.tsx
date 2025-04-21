import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { format, subDays } from 'date-fns';
import {
  BarChart3,
  DollarSign,
  MousePointerClick,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Globe,
  Activity,
  Target,
  Share2,
  Heart,
  Eye,
  MessageSquare,
  Repeat2
} from 'lucide-react';

const generateDailyData = (days: number) => {
  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(new Date(), days - 1 - index);
    return {
      date: format(date, 'MMM dd'),
      impressions: 10000 + Math.floor(Math.random() * 5000),
      clicks: 350 + Math.floor(Math.random() * 200),
      conversions: 20 + Math.floor(Math.random() * 15),
      spend: 700 + Math.floor(Math.random() * 300),
      revenue: 1000 + Math.floor(Math.random() * 500),
      engagement: 250 + Math.floor(Math.random() * 100),
      shares: 45 + Math.floor(Math.random() * 30),
      likes: 180 + Math.floor(Math.random() * 80)
    };
  });
};

const adData = {
  daily: {
    impressions: 12500,
    clicks: 450,
    conversions: 28,
    spend: 850,
    revenue: 1200,
    engagement: 320,
    shares: 65,
    likes: 230,
    previousImpressions: 11000,
    previousClicks: 420,
    previousConversions: 25,
    previousSpend: 800,
    previousRevenue: 1000,
    previousEngagement: 280,
    previousShares: 55,
    previousLikes: 200
  },
  deviceBreakdown: {
    desktop: 45,
    mobile: 40,
    tablet: 15
  },
  platformEngagement: {
    facebook: { engagement: 45, reach: 15000 },
    instagram: { engagement: 38, reach: 12000 },
    twitter: { engagement: 28, reach: 8000 },
    linkedin: { engagement: 22, reach: 5000 }
  },
  contentPerformance: [
    { type: 'Video', engagement: 65, reach: 20000, conversion: 4.2 },
    { type: 'Image', engagement: 48, reach: 15000, conversion: 3.1 },
    { type: 'Carousel', engagement: 52, reach: 18000, conversion: 3.8 },
    { type: 'Text', engagement: 35, reach: 10000, conversion: 2.5 }
  ],
  audienceInterests: [
    ['Interest', 'Percentage'],
    ['Technology', 35],
    ['Fashion', 25],
    ['Sports', 20],
    ['Travel', 15],
    ['Food', 5]
  ],
  topCountries: [
    { country: 'United States', sessions: 5200, conversion: 4.2 },
    { country: 'United Kingdom', sessions: 2100, conversion: 3.8 },
    { country: 'Canada', sessions: 1800, conversion: 3.5 },
    { country: 'Australia', sessions: 1200, conversion: 3.2 },
    { country: 'Germany', sessions: 900, conversion: 2.9 }
  ],
  userBehavior: {
    avgSessionDuration: '4:15',
    bounceRate: '35.8%',
    pagesPerSession: 3.2,
    newUsers: '65%',
    returningUsers: '35%',
    avgTimeOnPage: '2:45',
    exitRate: '28.5%'
  },
  historicalData: generateDailyData(7),
  ageGroups: [
    ['Age', 'Users', { role: 'style' }],
    ['18-24', 2500, '#3b82f6'],
    ['25-34', 4200, '#10b981'],
    ['35-44', 3800, '#6366f1'],
    ['45-54', 2100, '#f59e0b'],
    ['55+', 1400, '#ef4444']
  ],
  engagementMetrics: [
    ['Hour', 'Engagement Score', 'Conversion Rate'],
    [0, 20, 1.2],
    [4, 15, 0.8],
    [8, 50, 2.5],
    [12, 75, 3.8],
    [16, 85, 4.2],
    [20, 45, 2.1]
  ],
  adPerformance: [
    ['Ad Type', 'CTR', 'CPC', 'Conversion Rate'],
    ['Search', 3.2, 1.5, 2.8],
    ['Display', 0.8, 0.5, 1.2],
    ['Social', 1.5, 0.8, 2.1],
    ['Video', 2.1, 1.2, 1.8]
  ]
};

function MetricCard({ title, value, icon: Icon, previousValue, format = 'number' }) {
  const percentage = ((value - previousValue) / previousValue * 100).toFixed(1);
  const isPositive = value >= previousValue;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-gray-600 font-medium">{title}</h3>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="text-sm">{percentage}%</span>
        </div>
      </div>
      <p className="text-2xl font-bold">
        {format === 'currency' ? `$${value.toLocaleString()}` : value.toLocaleString()}
      </p>
    </div>
  );
}

function App() {
  const [timeframe] = useState('daily');
  const data = adData[timeframe];
  
  const metrics = [
    {
      title: 'Impressions',
      value: data.impressions,
      previousValue: data.previousImpressions,
      icon: Eye
    },
    {
      title: 'Clicks',
      value: data.clicks,
      previousValue: data.previousClicks,
      icon: MousePointerClick
    },
    {
      title: 'Conversions',
      value: data.conversions,
      previousValue: data.previousConversions,
      icon: Target
    },
    {
      title: 'Ad Spend',
      value: data.spend,
      previousValue: data.previousSpend,
      icon: DollarSign,
      format: 'currency'
    },
    {
      title: 'Revenue',
      value: data.revenue,
      previousValue: data.previousRevenue,
      icon: BarChart3,
      format: 'currency'
    },
    {
      title: 'Engagement',
      value: data.engagement,
      previousValue: data.previousEngagement,
      icon: Activity
    },
    {
      title: 'Shares',
      value: data.shares,
      previousValue: data.previousShares,
      icon: Share2
    },
    {
      title: 'Likes',
      value: data.likes,
      previousValue: data.previousLikes,
      icon: Heart
    }
  ];

  const chartData = [
    ['Date', 'Impressions', 'Clicks', 'Conversions', 'Engagement'],
    ...adData.historicalData.map(day => [
      day.date,
      day.impressions,
      day.clicks,
      day.conversions,
      day.engagement
    ])
  ];

  const deviceData = [
    ['Device', 'Percentage'],
    ['Desktop', adData.deviceBreakdown.desktop],
    ['Mobile', adData.deviceBreakdown.mobile],
    ['Tablet', adData.deviceBreakdown.tablet]
  ];

  const platformData = [
    ['Platform', 'Engagement Rate', 'Reach'],
    ['Facebook', adData.platformEngagement.facebook.engagement, adData.platformEngagement.facebook.reach],
    ['Instagram', adData.platformEngagement.instagram.engagement, adData.platformEngagement.instagram.reach],
    ['Twitter', adData.platformEngagement.twitter.engagement, adData.platformEngagement.twitter.reach],
    ['LinkedIn', adData.platformEngagement.linkedin.engagement, adData.platformEngagement.linkedin.reach]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ad Performance Dashboard</h1>
          <p className="text-gray-600">Comprehensive Analytics and ROI Tracking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              previousValue={metric.previousValue}
              icon={metric.icon}
              format={metric.format}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={chartData}
              options={{
                chartArea: { width: '80%', height: '80%' },
                seriesType: 'bars',
                series: {
                  1: { type: 'line' },
                  2: { type: 'line' },
                  3: { type: 'line' }
                },
                legend: { position: 'top' },
                colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b']
              }}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
            <Chart
              chartType="BubbleChart"
              width="100%"
              height="400px"
              data={platformData}
              options={{
                chartArea: { width: '80%', height: '80%' },
                colorAxis: { colors: ['#3b82f6', '#10b981'] },
                hAxis: { title: 'Engagement Rate (%)' },
                vAxis: { title: 'Reach' },
                bubble: { textStyle: { fontSize: 11 } }
              }}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Content Performance</h2>
            <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              data={[
                ['Content Type', 'Engagement', 'Conversion Rate'],
                ...adData.contentPerformance.map(item => [
                  item.type,
                  item.engagement,
                  item.conversion
                ])
              ]}
              options={{
                chartArea: { width: '80%', height: '80%' },
                isStacked: true,
                colors: ['#3b82f6', '#10b981'],
                hAxis: { title: 'Metrics' },
                vAxis: { title: 'Content Type' }
              }}
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Audience Interests</h2>
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={adData.audienceInterests}
              options={{
                chartArea: { width: '80%', height: '80%' },
                colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ef4444'],
                is3D: true
              }}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Behavior Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <p className="text-blue-600 font-medium">Session Duration</p>
                </div>
                <p className="text-2xl font-bold">{adData.userBehavior.avgSessionDuration}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <p className="text-green-600 font-medium">Bounce Rate</p>
                </div>
                <p className="text-2xl font-bold">{adData.userBehavior.bounceRate}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <p className="text-purple-600 font-medium">Pages/Session</p>
                </div>
                <p className="text-2xl font-bold">{adData.userBehavior.pagesPerSession}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Repeat2 className="w-5 h-5 text-orange-600" />
                  <p className="text-orange-600 font-medium">Return Rate</p>
                </div>
                <p className="text-2xl font-bold">{adData.userBehavior.returningUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Ad Type Performance</h2>
            <Chart
              chartType="Table"
              width="100%"
              height="400px"
              data={adData.adPerformance}
              options={{
                showRowNumber: true,
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Geographic Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {adData.topCountries.map((country, index) => (
                <div 
                  key={country.country} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-semibold">{country.sessions.toLocaleString()} sessions</p>
                    <p className="text-sm text-gray-600">{country.conversion}% conversion</p>
                  </div>
                </div>
              ))}
            </div>
            <Chart
              chartType="GeoChart"
              width="100%"
              height="400px"
              data={[
                ['Country', 'Sessions'],
                ...adData.topCountries.map(country => [
                  country.country,
                  country.sessions
                ])
              ]}
              options={{
                colorAxis: { colors: ['#93c5fd', '#3b82f6'] }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;