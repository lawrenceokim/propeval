begin;

insert into properties (id, name, city, address, monthly_rent, status, created_at) values
('prop_01','Westbourne House','London','18 Westbourne Grove, W2 5RH',4250,'occupied','2024-01-12'),
('prop_02','Clerkenwell Loft','London','42 St John Street, EC1M 4AY',3900,'occupied','2024-02-03'),
('prop_03','Camden Townhouse','London','7 Arlington Road, NW1 7ER',5100,'vacant','2024-03-21'),
('prop_04','Marais Atelier','Paris','23 Rue du Temple, 75004',3600,'occupied','2024-01-19'),
('prop_05','Canal Saint-Martin','Paris','11 Quai de Valmy, 75010',3150,'vacant','2024-05-04'),
('prop_06','Montmartre Residence','Paris','8 Rue des Abbesses, 75018',3350,'occupied','2024-06-10'),
('prop_07','Alfama Courtyard','Lisbon','14 Rua dos Remedios, 1100-446',2450,'occupied','2024-02-28'),
('prop_08','Principe Real Flat','Lisbon','31 Rua da Escola Politecnica, 1250-099',2800,'vacant','2024-04-17'),
('prop_09','Graca Lookout','Lisbon','6 Calcada da Graca, 1100-265',2250,'vacant','2024-07-08'),
('prop_10','Hydra Garden Suite','Algiers','28 Rue des Pins, Hydra 16035',1850,'occupied','2024-01-30'),
('prop_11','Didouche Mourad Home','Algiers','104 Rue Didouche Mourad, 16000',1650,'occupied','2024-05-22'),
('prop_12','Sidi Yahia Residence','Algiers','15 Chemin Sidi Yahia, Hydra 16035',2100,'occupied','2024-08-02')
on conflict (id) do nothing;

insert into guests (id, name, email, phone, created_at) values
('guest_01','Amelia Hart','amelia.hart@example.com','+44 7700 900101','2025-04-11'),
('guest_02','Theo Martin','theo.martin@example.com','+33 6 12 34 56 01','2025-05-18'),
('guest_03','Ines Carvalho','ines.carvalho@example.com','+351 912 300 102','2025-06-07'),
('guest_04','Yasmine Bensaid','yasmine.b@example.com','+213 555 010 203','2025-08-19'),
('guest_05','Oliver Chen','oliver.chen@example.com','+44 7700 900105','2025-09-02'),
('guest_06','Maya Laurent','maya.laurent@example.com','+33 6 12 34 56 06','2025-10-14'),
('guest_07','Lucas Ferreira','lucas.f@example.com','+351 912 300 107','2025-11-21'),
('guest_08','Nadia Rahal','nadia.rahal@example.com','+213 555 010 208','2026-01-08'),
('guest_09','Sofia Rossi','sofia.rossi@example.com','+39 320 555 0199','2026-02-17'),
('guest_10','James Walker','james.walker@example.com','+44 7700 900110','2026-03-05')
on conflict (id) do nothing;

insert into bookings (id, property_id, guest_id, check_in, check_out, status, created_at) values
('book_01','prop_01','guest_01','2026-07-15','2026-10-15','active','2026-05-02'),
('book_02','prop_02','guest_05','2026-08-20','2026-09-20','active','2026-07-12'),
('book_03','prop_04','guest_02','2026-06-01','2026-12-01','active','2026-03-17'),
('book_04','prop_06','guest_06','2026-09-05','2026-09-20','active','2026-08-01'),
('book_05','prop_07','guest_03','2026-08-01','2026-11-03','active','2026-06-10'),
('book_06','prop_10','guest_04','2026-07-22','2026-10-02','active','2026-05-28'),
('book_07','prop_11','guest_08','2026-09-01','2026-10-01','active','2026-07-18'),
('book_08','prop_12','guest_10','2026-08-17','2026-11-17','active','2026-06-30'),
('book_09','prop_08','guest_07','2026-09-13','2026-10-13','confirmed','2026-08-10'),
('book_10','prop_03','guest_09','2026-09-16','2026-10-08','confirmed','2026-08-19'),
('book_11','prop_05','guest_01','2026-09-20','2026-10-20','confirmed','2026-08-23'),
('book_12','prop_09','guest_05','2026-10-01','2026-10-24','confirmed','2026-09-01'),
('book_13','prop_01','guest_09','2026-02-01','2026-03-01','completed','2025-12-08'),
('book_14','prop_03','guest_10','2026-04-10','2026-06-10','completed','2026-02-14'),
('book_15','prop_05','guest_06','2026-01-15','2026-04-15','completed','2025-11-19'),
('book_16','prop_07','guest_02','2026-03-02','2026-05-29','completed','2026-01-04'),
('book_17','prop_10','guest_07','2026-02-12','2026-05-12','completed','2025-12-20'),
('book_18','prop_11','guest_03','2026-05-20','2026-08-20','completed','2026-03-01'),
('book_19','prop_12','guest_04','2026-01-08','2026-04-08','completed','2025-11-02'),
('book_20','prop_08','guest_08','2026-06-01','2026-07-01','cancelled','2026-04-11')
on conflict (id) do nothing;

insert into maintenance_requests (id, property_id, title, description, priority, status, created_at) values
('maint_01','prop_02','Boiler pressure loss','Heating pressure drops overnight and requires a manual reset each morning.','critical','open','2026-09-10'),
('maint_02','prop_10','Water ingress near balcony','Moisture visible below the balcony door after heavy rain.','critical','in_progress','2026-09-08'),
('maint_03','prop_07','Bedroom air conditioning','Main bedroom unit powers on but does not cool below 25°C.','high','open','2026-09-09'),
('maint_04','prop_04','Intercom audio fault','Visitors can hear the guest, but incoming audio is intermittent.','high','in_progress','2026-09-05'),
('maint_05','prop_03','Garden gate alignment','Gate catches on paving and needs hinge adjustment before next arrival.','medium','open','2026-09-07'),
('maint_06','prop_08','Dishwasher drainage','Dishwasher leaves standing water at the end of a cycle.','medium','open','2026-09-06'),
('maint_07','prop_12','Hallway light flicker','Ceiling fixture flickers intermittently when first switched on.','low','open','2026-09-04'),
('maint_08','prop_01','Loose wardrobe handle','Handle in the second bedroom needs refitting.','low','resolved','2026-08-29'),
('maint_09','prop_05','Bathroom sealant renewal','Sealant around shower tray has discoloured and started lifting.','medium','resolved','2026-08-21'),
('maint_10','prop_06','Front door lock stiff','Key requires excess force when locking from the outside.','high','resolved','2026-08-17'),
('maint_11','prop_09','Wi-Fi access point offline','Living room access point is not visible in the network controller.','high','in_progress','2026-09-03'),
('maint_12','prop_11','Kitchen tap aerator','Water spray is uneven; aerator likely needs cleaning or replacement.','low','resolved','2026-08-31')
on conflict (id) do nothing;

commit;
