'use client';

import React from 'react';
import { Bed, CheckCircle, Clock } from '@phosphor-icons/react';

export default function RoomTypeSelector({ roomTypes = [], selectedRoomId, onSelectRoom }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
          Available Room Types & Sharing
        </h3>
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Clock size={14} className="text-primary" />
          <span>Availability updated 2 days ago</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {roomTypes.map((room) => {
          const isSelected = selectedRoomId === room.id;

          return (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-card border-primary ring-2 ring-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-heading font-bold text-sm text-foreground">
                    <Bed size={16} className="text-primary" />
                    <span>{room.name}</span>
                  </div>
                  {isSelected && <CheckCircle size={18} className="text-primary" weight="fill" />}
                </div>

                <div className="text-xs text-muted-foreground mb-3">
                  {room.sharing} · {room.ac ? 'Air Conditioned' : 'Well Ventilated'}
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-heading font-bold text-lg text-primary">
                    ₹{room.rent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  Deposit: ₹{room.deposit.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-border flex items-center justify-between text-xs">
                <span
                  className={`font-semibold px-2 py-0.5 rounded-pill ${
                    room.availableBeds <= 2 ? 'bg-muted text-secondary' : 'bg-canvas text-mess'
                  }`}
                >
                  {room.availableBeds} beds available
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  {room.attachedBath ? 'Attached Bath' : 'Common Bath'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
