"use client"

import type { StaffMember } from "@/lib/staff-data"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { SkeletonStaffCard } from "@/components/skeletons/skeleton-staff-card"
import { SKELETON_COUNTS } from "@/lib/skeleton-utils"

interface StaffGridProps {
  members: StaffMember[]
  isLoading?: boolean
}

export default function StaffGrid({ members, isLoading = false }: StaffGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading
        ? Array.from({ length: SKELETON_COUNTS.STAFF }).map((_, i) => <SkeletonStaffCard key={i} />)
        : members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-accent"
            >
              {/* Image */}
              <div className="relative w-full h-64 bg-muted overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-accent mb-3">{member.position}</p>

                {member.specialization && <p className="text-sm text-muted-foreground mb-4">{member.specialization}</p>}

                {/* Contact Info */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                  >
                    <Mail size={16} className="text-accent" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                  >
                    <Phone size={16} className="text-accent" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}
