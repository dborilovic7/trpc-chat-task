import { useEffect, useRef } from "react";
import { HelpDialogPropTypes } from "../../types";

const HelpDialog = ({ open, setOpen }: HelpDialogPropTypes) => {
  const dialogRef = useRef<HTMLDialogElement|null>(null);

  open ? dialogRef?.current?.showModal() : dialogRef?.current?.close();

  const closeOnOutsideClick = (e: MouseEvent, dialog: HTMLDialogElement) => {
    const { clientX, clientY } = e;
    const { top, bottom, right, left } = dialog.getBoundingClientRect();

    if ( clientX < left || clientX > right ||
      clientY < top || clientY > bottom) {
      setOpen(false);
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    dialog?.addEventListener("click", (e) => closeOnOutsideClick(e, dialog));
    return dialog?.removeEventListener("click", (e) => closeOnOutsideClick(e, dialog));
  }, []);

  return (
    <dialog ref={dialogRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      p-6 rounded-xl shadow-lg border-2 border-black bg-bubbles min-w-[250px] w-max-content">

      <p className="mx-auto w-fit font-bold text-2xl text-queen-blue">Help</p>
      <button onClick={() => setOpen(false)} className="absolute right-6 top-6 w-8 h-8">
        <img src="/src/assets/icons/close.svg" alt="X icon" />
      </button>

      <div className="mt-4">
        <p>You can use special chat commands by typing '/<i>command-name</i>'.</p>
        <p className="mt-4 font-semibold text-lg text-medium-ruby">Special Chat Commands:</p>
        <ul className="list-disc ml-6">
          <li className="mt-1">
            /nick <i>&lt;nickname&gt;</i>
            <img src="/src/assets/icons/arrow-right.svg" alt="Right arrow" className="w-4 h-4 inline mx-2" />
            Change your nickname.
          </li>
          <li className="mt-1">
            /think <i>&lt;message&gt;</i>
            <img src="/src/assets/icons/arrow-right.svg" alt="Right arrow" className="w-4 h-4 inline mx-2" />
            Send a message with different styling.
          </li>
          <li className="mt-1">
            /oops
            <img src="/src/assets/icons/arrow-right.svg" alt="Right arrow" className="w-4 h-4 inline mx-2" />
            Delete your last message.
          </li>
          <li className="mt-1">
            /edit <i>&lt;message&gt;</i>
            <img src="/src/assets/icons/arrow-right.svg" alt="Right arrow" className="w-4 h-4 inline mx-2" />
            Edit your last message.
          </li>
        </ul>
      </div>
      
    </dialog>
  );
}

export default HelpDialog;