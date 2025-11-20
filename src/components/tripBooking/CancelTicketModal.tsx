"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function CancelTicketModal({
close,
  seatId,
  bookingId,
  onConfirm,
}: {
    close: () => void;
  seatId: string;
  bookingId: string;
  onConfirm: () => void; 
}) {
  return (
    <DialogContent className="max-w-sm space-y-4">
      <DialogHeader>
        <DialogTitle>Cancel Booking?</DialogTitle>
        <DialogDescription>
          You are canceling seat <b>{seatId}</b> from booking <b>{bookingId}</b>.
          <br />
          <span className="text-red-600 font-semibold">Refund Eligible: 65%</span>
        </DialogDescription>
      </DialogHeader>

      {/* Simple Cancellation Policies */}
      <div className="bg-gray-100 p-3 rounded-md text-sm space-y-2">
        <p className="font-medium">Cancellation Policy:</p>

        <ul className="list-disc ml-5 space-y-1">
          <li>✔ A fixed <b>65% refund</b> is provided upon cancellation.</li>
          <li>✔ A <b>₹20 service fee</b> will be deducted from the refund.</li>
          <li>✔ Cancellation is allowed only <b>before bus departure</b>.</li>
          <li>✔ No refund if the ticket is already scanned/used.</li>
          <li>✔ GST and applied coupons are <b>non-refundable</b>.</li>
          <li>
            ✔ Refund will be credited to your bank account within  
            <b>2 working days</b>.
          </li>
        </ul>
      </div>

      <DialogFooter>
        <button className="px-4 py-2 rounded-md border text-sm"
        onClick={close}>
          Close
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-700/50 hover:bg-red-700 text-white text-sm cursor-pointer"
        >
          Confirm Cancel
        </button>
      </DialogFooter>
    </DialogContent>
  );
}
