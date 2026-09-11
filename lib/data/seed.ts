import type { Booking, Guest, MaintenanceRequest, Property } from "@/lib/types";

export const properties: Property[] = [
  { id: "prop_01", name: "Westbourne House", city: "London", address: "18 Westbourne Grove, W2 5RH", monthlyRent: 4250, status: "occupied", createdAt: "2024-01-12T09:00:00Z" },
  { id: "prop_02", name: "Clerkenwell Loft", city: "London", address: "42 St John Street, EC1M 4AY", monthlyRent: 3900, status: "occupied", createdAt: "2024-02-03T09:00:00Z" },
  { id: "prop_03", name: "Camden Townhouse", city: "London", address: "7 Arlington Road, NW1 7ER", monthlyRent: 5100, status: "vacant", createdAt: "2024-03-21T09:00:00Z" },
  { id: "prop_04", name: "Marais Atelier", city: "Paris", address: "23 Rue du Temple, 75004", monthlyRent: 3600, status: "occupied", createdAt: "2024-01-19T09:00:00Z" },
  { id: "prop_05", name: "Canal Saint-Martin", city: "Paris", address: "11 Quai de Valmy, 75010", monthlyRent: 3150, status: "vacant", createdAt: "2024-05-04T09:00:00Z" },
  { id: "prop_06", name: "Montmartre Residence", city: "Paris", address: "8 Rue des Abbesses, 75018", monthlyRent: 3350, status: "occupied", createdAt: "2024-06-10T09:00:00Z" },
  { id: "prop_07", name: "Alfama Courtyard", city: "Lisbon", address: "14 Rua dos Remedios, 1100-446", monthlyRent: 2450, status: "occupied", createdAt: "2024-02-28T09:00:00Z" },
  { id: "prop_08", name: "Principe Real Flat", city: "Lisbon", address: "31 Rua da Escola Politecnica, 1250-099", monthlyRent: 2800, status: "vacant", createdAt: "2024-04-17T09:00:00Z" },
  { id: "prop_09", name: "Graca Lookout", city: "Lisbon", address: "6 Calcada da Graca, 1100-265", monthlyRent: 2250, status: "vacant", createdAt: "2024-07-08T09:00:00Z" },
  { id: "prop_10", name: "Hydra Garden Suite", city: "Algiers", address: "28 Rue des Pins, Hydra 16035", monthlyRent: 1850, status: "occupied", createdAt: "2024-01-30T09:00:00Z" },
  { id: "prop_11", name: "Didouche Mourad Home", city: "Algiers", address: "104 Rue Didouche Mourad, 16000", monthlyRent: 1650, status: "occupied", createdAt: "2024-05-22T09:00:00Z" },
  { id: "prop_12", name: "Sidi Yahia Residence", city: "Algiers", address: "15 Chemin Sidi Yahia, Hydra 16035", monthlyRent: 2100, status: "occupied", createdAt: "2024-08-02T09:00:00Z" },
];

export const guests: Guest[] = [
  { id: "guest_01", name: "Amelia Hart", email: "amelia.hart@example.com", phone: "+44 7700 900101", createdAt: "2025-04-11T10:00:00Z" },
  { id: "guest_02", name: "Theo Martin", email: "theo.martin@example.com", phone: "+33 6 12 34 56 01", createdAt: "2025-05-18T10:00:00Z" },
  { id: "guest_03", name: "Ines Carvalho", email: "ines.carvalho@example.com", phone: "+351 912 300 102", createdAt: "2025-06-07T10:00:00Z" },
  { id: "guest_04", name: "Yasmine Bensaid", email: "yasmine.b@example.com", phone: "+213 555 010 203", createdAt: "2025-08-19T10:00:00Z" },
  { id: "guest_05", name: "Oliver Chen", email: "oliver.chen@example.com", phone: "+44 7700 900105", createdAt: "2025-09-02T10:00:00Z" },
  { id: "guest_06", name: "Maya Laurent", email: "maya.laurent@example.com", phone: "+33 6 12 34 56 06", createdAt: "2025-10-14T10:00:00Z" },
  { id: "guest_07", name: "Lucas Ferreira", email: "lucas.f@example.com", phone: "+351 912 300 107", createdAt: "2025-11-21T10:00:00Z" },
  { id: "guest_08", name: "Nadia Rahal", email: "nadia.rahal@example.com", phone: "+213 555 010 208", createdAt: "2026-01-08T10:00:00Z" },
  { id: "guest_09", name: "Sofia Rossi", email: "sofia.rossi@example.com", phone: "+39 320 555 0199", createdAt: "2026-02-17T10:00:00Z" },
  { id: "guest_10", name: "James Walker", email: "james.walker@example.com", phone: "+44 7700 900110", createdAt: "2026-03-05T10:00:00Z" },
];

export const bookings: Booking[] = [
  { id: "book_01", propertyId: "prop_01", guestId: "guest_01", checkIn: "2026-07-15", checkOut: "2026-10-15", status: "active", createdAt: "2026-05-02T11:00:00Z" },
  { id: "book_02", propertyId: "prop_02", guestId: "guest_05", checkIn: "2026-08-20", checkOut: "2026-09-20", status: "active", createdAt: "2026-07-12T11:00:00Z" },
  { id: "book_03", propertyId: "prop_04", guestId: "guest_02", checkIn: "2026-06-01", checkOut: "2026-12-01", status: "active", createdAt: "2026-03-17T11:00:00Z" },
  { id: "book_04", propertyId: "prop_06", guestId: "guest_06", checkIn: "2026-09-05", checkOut: "2026-09-20", status: "active", createdAt: "2026-08-01T11:00:00Z" },
  { id: "book_05", propertyId: "prop_07", guestId: "guest_03", checkIn: "2026-08-01", checkOut: "2026-11-03", status: "active", createdAt: "2026-06-10T11:00:00Z" },
  { id: "book_06", propertyId: "prop_10", guestId: "guest_04", checkIn: "2026-07-22", checkOut: "2026-10-02", status: "active", createdAt: "2026-05-28T11:00:00Z" },
  { id: "book_07", propertyId: "prop_11", guestId: "guest_08", checkIn: "2026-09-01", checkOut: "2026-10-01", status: "active", createdAt: "2026-07-18T11:00:00Z" },
  { id: "book_08", propertyId: "prop_12", guestId: "guest_10", checkIn: "2026-08-17", checkOut: "2026-11-17", status: "active", createdAt: "2026-06-30T11:00:00Z" },
  { id: "book_09", propertyId: "prop_08", guestId: "guest_07", checkIn: "2026-09-13", checkOut: "2026-10-13", status: "confirmed", createdAt: "2026-08-10T11:00:00Z" },
  { id: "book_10", propertyId: "prop_03", guestId: "guest_09", checkIn: "2026-09-16", checkOut: "2026-10-08", status: "confirmed", createdAt: "2026-08-19T11:00:00Z" },
  { id: "book_11", propertyId: "prop_05", guestId: "guest_01", checkIn: "2026-09-20", checkOut: "2026-10-20", status: "confirmed", createdAt: "2026-08-23T11:00:00Z" },
  { id: "book_12", propertyId: "prop_09", guestId: "guest_05", checkIn: "2026-10-01", checkOut: "2026-10-24", status: "confirmed", createdAt: "2026-09-01T11:00:00Z" },
  { id: "book_13", propertyId: "prop_01", guestId: "guest_09", checkIn: "2026-02-01", checkOut: "2026-03-01", status: "completed", createdAt: "2025-12-08T11:00:00Z" },
  { id: "book_14", propertyId: "prop_03", guestId: "guest_10", checkIn: "2026-04-10", checkOut: "2026-06-10", status: "completed", createdAt: "2026-02-14T11:00:00Z" },
  { id: "book_15", propertyId: "prop_05", guestId: "guest_06", checkIn: "2026-01-15", checkOut: "2026-04-15", status: "completed", createdAt: "2025-11-19T11:00:00Z" },
  { id: "book_16", propertyId: "prop_07", guestId: "guest_02", checkIn: "2026-03-02", checkOut: "2026-05-29", status: "completed", createdAt: "2026-01-04T11:00:00Z" },
  { id: "book_17", propertyId: "prop_10", guestId: "guest_07", checkIn: "2026-02-12", checkOut: "2026-05-12", status: "completed", createdAt: "2025-12-20T11:00:00Z" },
  { id: "book_18", propertyId: "prop_11", guestId: "guest_03", checkIn: "2026-05-20", checkOut: "2026-08-20", status: "completed", createdAt: "2026-03-01T11:00:00Z" },
  { id: "book_19", propertyId: "prop_12", guestId: "guest_04", checkIn: "2026-01-08", checkOut: "2026-04-08", status: "completed", createdAt: "2025-11-02T11:00:00Z" },
  { id: "book_20", propertyId: "prop_08", guestId: "guest_08", checkIn: "2026-06-01", checkOut: "2026-07-01", status: "cancelled", createdAt: "2026-04-11T11:00:00Z" },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: "maint_01", propertyId: "prop_02", title: "Boiler pressure loss", description: "Heating pressure drops overnight and requires a manual reset each morning.", priority: "critical", status: "open", createdAt: "2026-09-10T08:12:00Z" },
  { id: "maint_02", propertyId: "prop_10", title: "Water ingress near balcony", description: "Moisture visible below the balcony door after heavy rain.", priority: "critical", status: "in_progress", createdAt: "2026-09-08T14:35:00Z" },
  { id: "maint_03", propertyId: "prop_07", title: "Bedroom air conditioning", description: "Main bedroom unit powers on but does not cool below 25°C.", priority: "high", status: "open", createdAt: "2026-09-09T10:05:00Z" },
  { id: "maint_04", propertyId: "prop_04", title: "Intercom audio fault", description: "Visitors can hear the guest, but incoming audio is intermittent.", priority: "high", status: "in_progress", createdAt: "2026-09-05T16:40:00Z" },
  { id: "maint_05", propertyId: "prop_03", title: "Garden gate alignment", description: "Gate catches on paving and needs hinge adjustment before next arrival.", priority: "medium", status: "open", createdAt: "2026-09-07T09:20:00Z" },
  { id: "maint_06", propertyId: "prop_08", title: "Dishwasher drainage", description: "Dishwasher leaves standing water at the end of a cycle.", priority: "medium", status: "open", createdAt: "2026-09-06T11:48:00Z" },
  { id: "maint_07", propertyId: "prop_12", title: "Hallway light flicker", description: "Ceiling fixture flickers intermittently when first switched on.", priority: "low", status: "open", createdAt: "2026-09-04T13:11:00Z" },
  { id: "maint_08", propertyId: "prop_01", title: "Loose wardrobe handle", description: "Handle in the second bedroom needs refitting.", priority: "low", status: "resolved", createdAt: "2026-08-29T10:30:00Z" },
  { id: "maint_09", propertyId: "prop_05", title: "Bathroom sealant renewal", description: "Sealant around shower tray has discoloured and started lifting.", priority: "medium", status: "resolved", createdAt: "2026-08-21T15:00:00Z" },
  { id: "maint_10", propertyId: "prop_06", title: "Front door lock stiff", description: "Key requires excess force when locking from the outside.", priority: "high", status: "resolved", createdAt: "2026-08-17T09:45:00Z" },
  { id: "maint_11", propertyId: "prop_09", title: "Wi-Fi access point offline", description: "Living room access point is not visible in the network controller.", priority: "high", status: "in_progress", createdAt: "2026-09-03T12:25:00Z" },
  { id: "maint_12", propertyId: "prop_11", title: "Kitchen tap aerator", description: "Water spray is uneven; aerator likely needs cleaning or replacement.", priority: "low", status: "resolved", createdAt: "2026-08-31T14:18:00Z" },
];
