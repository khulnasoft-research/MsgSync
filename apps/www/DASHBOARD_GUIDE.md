# MsgSync Enterprise Dashboard

## Overview

The MsgSync dashboard is a production-grade, enterprise messaging platform interface built with Next.js 14, React 18, Tailwind CSS, and Framer Motion. It provides real-time analytics, multi-protocol message routing, and system monitoring capabilities.

## Architecture

### Design System

**Color Palette:**
- Primary: Blue (#2563eb) - Used for main actions and highlights
- Accent: Purple (#a855f7) - Used for secondary actions and highlights
- Success: Green (#10b981) - Status indicators and positive metrics
- Warning: Amber (#f59e0b) - Alerts and warnings
- Error: Red (#ef4444) - Errors and critical alerts
- Neutrals: Grayscale (50-900) - Backgrounds and text

**Typography:**
- Headings: Inter (semibold, -0.02em letter spacing)
- Body: Inter (regular)
- Line-height: 1.4-1.6 for readability

**Theme:**
- Dark mode as primary (bg-neutral-900)
- Backdrop blur effects on floating UI
- Smooth transitions (duration-200) throughout

### Project Structure

```
apps/www/src/
├── app/
│   ├── dashboard/          # Main dashboard
│   ├── traffic/            # Traffic analytics
│   ├── messages/           # Message management
│   ├── campaigns/          # Campaign management
│   ├── routing/            # Message routing rules
│   ├── protocols/          # Protocol monitoring
│   ├── analytics/          # Advanced analytics
│   ├── login/              # Authentication
│   └── globals.css         # Design tokens & theme
├── components/
│   ├── StatCard.tsx        # KPI stat cards with animations
│   ├── ChartContainer.tsx  # Reusable chart wrapper
│   ├── Skeleton.tsx        # Loading skeletons
│   └── ...
├── lib/
│   ├── layout.tsx          # Main layout with sidebar
│   ├── auth.ts             # Authentication service
│   ├── api.ts              # API client
│   └── animations.ts       # Framer Motion variants
└── public/                 # Static assets
```

## Key Features

### 1. Responsive Sidebar Navigation
- 9+ navigation items with icons
- Active state highlighting with brand color
- Mobile overlay for small screens
- Sticky on desktop

### 2. Dashboard Page
- **KPI Section:** 6 metric cards showing:
  - Total Messages (2.8M+)
  - Delivery Rate (98.7%)
  - Active Campaigns
  - Active Clients
  - Account Balance
  - System Health
- **Visualizations:**
  - Message Volume Trends (Area chart with daily/weekly/monthly tabs)
  - Protocol Distribution (Pie chart - SMPP, HTTP API, Webhook, Other)
  - Campaign Performance (Bar chart comparing sent vs. delivered)
- **Quick Actions:** Send message, new campaign, add contact

### 3. Traffic Analytics Page
- Request volume trends
- Response latency monitoring
- Error rate tracking
- Per-endpoint breakdown

### 4. Messages Page
- Message list with search/filter
- Status indicators (Delivered, Pending, Failed)
- Protocol information per message
- Timestamps and sender info

### 5. Routing Rules Page
- Message route management
- Priority-based routing (Premium, Standard, Backup)
- Protocol selection and destination
- Status monitoring

### 6. Protocol Monitoring Page
- Real-time protocol status (6+ protocols)
- Connection counts
- Latency metrics
- Uptime percentages
- Protocol-specific settings

### 7. Enhanced Layout Components

**Header:**
- Search functionality
- Notification bell with status indicator
- Workspace selector dropdown
- Responsive design

**Activity Panel (Desktop Only):**
- Recent activity stream (4 activity types)
- System health indicators
- Redis, database, API gateway status
- Color-coded status dots

## Component Library

### StatCard
KPI card with icon, value, subtitle, and trend indicators.
```tsx
<StatCard
  title="Total Messages"
  value="2.8M"
  subtitle="+450K this month"
  icon={<MessageSquare />}
  change={12}
  trend="up"
  color="brand"
  delay={0.05}
/>
```

### ChartContainer
Wrapper for charts with optional tabs for time range selection.
```tsx
<ChartContainer
  title="Message Volume"
  tabs={['Daily', 'Weekly', 'Monthly']}
  onTabChange={handleTabChange}
>
  {/* Chart component */}
</ChartContainer>
```

## Animations & Interactions

- **Page Transitions:** Fade-in-up with staggered delays
- **Card Hover:** Subtle border color and shadow changes
- **Button Feedback:** Smooth background transitions
- **Loading States:** Pulse animation on skeletons
- **Chart Animations:** Framer Motion-powered entry animations

## Data & Integration

### Mock Data
All pages include realistic mock data for demonstration:
- Message statistics
- Traffic patterns
- Campaign performance
- Protocol metrics

### API Integration Points
- `/api/analytics/stats` - Dashboard statistics
- `/api/messages/list` - Message list
- `/api/traffic` - Traffic analytics
- `/api/routing` - Routing rules
- `/api/protocols` - Protocol status

## Accessibility

- Semantic HTML (`<main>`, `<header>`, `<nav>`)
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Screen reader text for decorative elements
- Color contrast compliance (WCAG AA)

## Performance Optimizations

- Code splitting by route
- Image optimization
- Lazy loading of charts
- Memoized components
- Efficient re-renders with motion

## Development

### Running the Dashboard
```bash
cd apps/www
npm run dev
# Opens at http://localhost:3000
```

### Building for Production
```bash
npm run build
npm start
```

### Environment Variables
See `.env.example` for required configuration.

## Future Enhancements

1. **Real-time Updates:** WebSocket integration for live metrics
2. **Export Features:** PDF/CSV export for reports
3. **Alerts System:** Custom alert rules and notifications
4. **User Management:** Team collaboration features
5. **API Documentation:** Interactive API explorer
6. **Advanced Filtering:** Sophisticated query builder
7. **Scheduling:** Campaign scheduling with templates
8. **A/B Testing:** Built-in A/B test framework

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Mobile 90+

## Dependencies

- **Framework:** Next.js 14.2.3
- **UI:** React 18.2, React DOM 18.2
- **Styling:** Tailwind CSS 3.4.1
- **Animations:** Framer Motion 11.18.2
- **Charts:** Recharts 2.12.0
- **Icons:** Lucide React 0.436.0
- **State Management:** SWR 2.2.4
- **HTTP Client:** Axios 1.7.0

## License

MIT - See LICENSE file for details
