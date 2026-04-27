import { Users, Activity, DollarSign, ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5% vs yesterday",
    changeType: "positive" as const,
    icon: Users,
    gradient: true,
  },
  {
    title: "Active Now",
    value: "147",
    change: "+3.2%",
    changeType: "positive" as const,
    icon: Activity,
  },
  {
    title: "Total Revenue",
    value: "$48,352",
    icon: DollarSign,
  },
  {
    title: "Pending Tasks",
    value: "6",
    subtitle: "/ 23",
    description: "6 completed today",
    icon: ListTodo,
    progress: 26,
  },
];

const recentOrders = [
  {
    id: "#12847",
    customer: "John Doe",
    items: 3,
    status: "Paid",
    date: "2 Mar",
  },
  {
    id: "#12846",
    customer: "Jane Smith",
    items: 1,
    status: "Pending",
    date: "1 Mar",
  },
  {
    id: "#12845",
    customer: "Bob Johnson",
    items: 5,
    status: "Shipped",
    date: "28 Feb",
  },
];

const recentUsers = [
  { name: "Sarah Connor", email: "sarah@example.com", time: "Today" },
  { name: "Mike Ross", email: "mike@example.com", time: "Yesterday" },
  { name: "Emma Watson", email: "emma@example.com", time: "3 days ago" },
];

const recentActivity = [
  {
    initials: "JD",
    name: "John Doe",
    action: "Created new project",
    time: "2 min ago",
  },
  {
    initials: "JS",
    name: "Jane Smith",
    action: "Updated settings",
    time: "5 min ago",
  },
  {
    initials: "BJ",
    name: "Bob Johnson",
    action: "Completed task",
    time: "12 min ago",
  },
  {
    initials: "AB",
    name: "Alice Brown",
    action: "Added new user",
    time: "25 min ago",
  },
  {
    initials: "CW",
    name: "Charlie Wilson",
    action: "Uploaded files",
    time: "1 hour ago",
  },
];

const quickActions = [
  { icon: Users, label: "Add User" },
  { icon: DollarSign, label: "New Order" },
  { icon: Activity, label: "View Reports" },
  { icon: ListTodo, label: "Settings" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, User!</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={
              stat.gradient
                ? "from-primary bg-gradient-to-br to-[#5c2d0e] text-white"
                : ""
            }
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle
                className={`text-sm font-medium ${stat.gradient ? "text-white/80" : "text-muted-foreground"}`}
              >
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-4 w-4 ${stat.gradient ? "text-white/80" : "text-muted-foreground"}`}
              />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.subtitle && (
                  <span
                    className={
                      stat.gradient ? "text-white/60" : "text-muted-foreground"
                    }
                  >
                    {stat.subtitle}
                  </span>
                )}
              </div>
              {stat.change && (
                <p
                  className={`text-xs ${stat.gradient ? "text-white/80" : stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.change}
                </p>
              )}
              {stat.description && (
                <p
                  className={`text-xs ${stat.gradient ? "text-white/60" : "text-muted-foreground"}`}
                >
                  {stat.description}
                </p>
              )}
              {stat.progress !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="bg-muted h-2 flex-1 rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {stat.progress}%
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-muted-foreground text-sm">
                Last 3 orders placed
              </p>
            </div>
            <Button variant="link" className="text-primary">
              View all →
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border-border flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                    <ListTodo className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Order {order.id}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.customer} • {order.items} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === "Paid"
                        ? "bg-green-500/10 text-green-500"
                        : order.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {order.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <p className="text-muted-foreground text-sm">
                Last 3 users registered
              </p>
            </div>
            <Button variant="link" className="text-primary">
              View all →
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-sm">
                  {user.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {activity.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs">
                  {activity.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2"
                >
                  <action.icon className="h-5 w-5" />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
