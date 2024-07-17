"use client";

import React, { useContext } from "react";
import { useChat } from "ai/react";

import Tiptap from "@/components/writing/Editor";
import { AppContext } from "@/components/context/AppProvider";

export default function Body() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  const { editor } = useContext(AppContext);

  return (
    <div
      // onClick={() => editor?.commands.focus("end")}
      className="w-full pt-24 pb-32 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-auto"
      >
        <Tiptap />
      </div>
    </div>
    // <div className="flex flex-col w-full max-w-md pt-24 pb-32 mx-auto stretch">
    //   {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    //   {messages.map((m) => (
    //     <div key={m.id} className="whitespace-pre-wrap">
    //       {m.role === "user" ? "User: " : "AI: "}
    //       {m.content}
    //     </div>
    //   ))}

    //   <form onSubmit={handleSubmit}>
    //     <input
    //       className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
    //       value={input}
    //       placeholder="Say something..."
    //       onChange={handleInputChange}
    //     />
    //   </form>
    // </div>
  );
}

const placeholderText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec lobortis ex. Pellentesque turpis nibh, convallis vitae fringilla ut, pharetra nec diam. Duis suscipit, odio a rhoncus suscipit, urna lectus laoreet ipsum, vel venenatis tortor diam ac libero. Quisque at suscipit mi. Maecenas iaculis nec sapien at lacinia. Curabitur sagittis at odio et viverra. Vestibulum elit tortor, aliquam id tempor eget, mollis sed augue. Integer scelerisque condimentum lacus, venenatis pellentesque augue sollicitudin eu. Duis nulla velit, lacinia eu turpis ac, placerat suscipit augue. Donec sed augue eleifend, efficitur leo a, posuere justo. Sed et blandit ipsum.


Nullam in ante leo. Integer eu sagittis nisl, maximus cursus augue. Sed dapibus magna porttitor tortor consequat, a blandit nulla malesuada. Etiam risus urna, viverra eget dolor in, congue mattis lectus. Ut pharetra leo id scelerisque porta. In egestas faucibus tortor, vel varius ex varius sit amet. Phasellus sodales tellus ut tortor elementum sodales. Nulla placerat feugiat metus, non fringilla nibh imperdiet non.


In hac habitasse platea dictumst. Nulla ullamcorper, quam sed imperdiet malesuada, augue felis sollicitudin erat, eget egestas elit massa ac odio. Cras lacinia nisi purus, sed fringilla tellus bibendum ac. Sed elit dolor, commodo et lorem et, fermentum bibendum ligula. Phasellus eget tincidunt lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse non ipsum gravida sem congue pulvinar sit amet non sapien. Nullam faucibus augue non bibendum euismod. Etiam et massa vitae erat efficitur venenatis nec et velit. Nulla mollis turpis ac magna imperdiet, ac aliquam turpis consectetur. Aenean ut mattis enim. Morbi lobortis egestas eros a efficitur. Sed quis euismod nisl. Donec feugiat hendrerit tempus. Donec porta facilisis lorem, in consectetur elit. Morbi fringilla ac ex a imperdiet.


Vestibulum id volutpat orci, vitae accumsan dolor. Vivamus quis enim gravida, efficitur turpis eu, tempus neque. Aenean feugiat purus diam, eu iaculis sapien euismod condimentum. Proin nec erat ut mauris consectetur interdum. Phasellus pulvinar arcu iaculis risus pellentesque accumsan. Duis nec feugiat sapien. Fusce fringilla odio non tellus vulputate, eget dictum risus tempus. Cras elementum sem sit amet mauris egestas, ac sodales risus tristique. Fusce ut sapien malesuada, varius neque lacinia, convallis nunc. Nam ac volutpat quam. Morbi quis ex id tellus posuere faucibus. Integer id risus sem. Phasellus et cursus tortor.


Mauris semper metus in pretium accumsan. Morbi vel nisi nec nulla feugiat euismod pellentesque non dui. Phasellus urna ipsum, facilisis eu sapien non, venenatis vehicula mi. Nullam dui diam, congue in rutrum egestas, ultrices ut lorem. Donec sit amet nibh felis. Integer sit amet felis ut lorem vulputate consequat. Donec ac lacinia nibh. Nunc sed libero nibh. Curabitur velit quam, posuere id justo eu, gravida gravida justo. Pellentesque tortor arcu, blandit mattis venenatis mollis, maximus ac tellus. Suspendisse mollis eleifend semper. Mauris quis diam eget nunc volutpat tincidunt.

Mauris semper metus in pretium accumsan. Morbi vel nisi nec nulla feugiat euismod pellentesque non dui. Phasellus urna ipsum, facilisis eu sapien non, venenatis vehicula mi. Nullam dui diam, congue in rutrum egestas, ultrices ut lorem. Donec sit amet nibh felis. Integer sit amet felis ut lorem vulputate consequat. Donec ac lacinia nibh. Nunc sed libero nibh. Curabitur velit quam, posuere id justo eu, gravida gravida justo. Pellentesque tortor arcu, blandit mattis venenatis mollis, maximus ac tellus. Suspendisse mollis eleifend semper. Mauris quis diam eget nunc volutpat tincidunt.

Mauris semper metus in pretium accumsan. Morbi vel nisi nec nulla feugiat euismod pellentesque non dui. Phasellus urna ipsum, facilisis eu sapien non, venenatis vehicula mi. Nullam dui diam, congue in rutrum egestas, ultrices ut lorem. Donec sit amet nibh felis. Integer sit amet felis ut lorem vulputate consequat. Donec ac lacinia nibh. Nunc sed libero nibh. Curabitur velit quam, posuere id justo eu, gravida gravida justo. Pellentesque tortor arcu, blandit mattis venenatis mollis, maximus ac tellus. Suspendisse mollis eleifend semper. Mauris quis diam eget nunc volutpat tincidunt.

`;
