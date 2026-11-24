"use client";
import { useRef, useState } from "react";
import { uploadImage } from "@/lib/cloudinary";

export default function Uploader({ onDone, multiple = false, label = "Upload image", folder = "luxora" }) {
  const ref = useRef();
  const [busy, setBusy] = useState("");
  async function pick(e) {
    const files = [...e.target.files];
    try {
      for (let i = 0; i < files.length; i++) {
        setBusy(`Uploading ${i + 1} of ${files.length}…`);
        await onDone(await uploadImage(files[i], folder));
      }
    } catch (err) { alert(err.message); }
    setBusy(""); e.target.value = "";
  }
  return (<>
    <input ref={ref} type="file" accept="image/*" multiple={multiple} hidden onChange={pick} />
    <button type="button" className="btn" disabled={!!busy} onClick={() => ref.current.click()}>{busy || label}</button>
  </>);
}
