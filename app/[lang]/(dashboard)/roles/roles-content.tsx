"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Role {
  id: string;
  name: string;
  slug: string;
  permissions: number;
  updatedAt: string;
}

interface RolesContentProps {
  roles: Role[];
  dict: {
    title: string;
    createRole: string;
    roleName: string;
    permissions: string;
    noRoles: string;
  };
  lang: string;
}

export function RolesContent({ roles, dict }: RolesContentProps) {
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (id: string) => {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRoles(
      selectedRoles.length === filteredRoles.length
        ? []
        : filteredRoles.map((r) => r.id)
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{dict.title}</h1>
          <p className="text-muted-foreground text-sm">
            Manage roles and permissions for your organization
          </p>
        </div>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          {dict.createRole}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {selectedRoles.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              {selectedRoles.length} selected
            </span>
            <Button variant="outline" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRoles.length === filteredRoles.length &&
                    filteredRoles.length > 0
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>{dict.roleName}</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-center">{dict.permissions}</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRoles.includes(role.id)}
                      onCheckedChange={() => toggleRole(role.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {role.slug}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{role.permissions}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {role.updatedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Manage Users</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <p className="text-muted-foreground">{dict.noRoles}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <p>
          Showing {filteredRoles.length} of {roles.length} results
        </p>
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <select className="border-input bg-background rounded-md border px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
