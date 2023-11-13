"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  //   const useAuth = useAuthModal();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
      //   useAuth.onOpen();
    }
  }, [user, isLoading, router]);
  if (songs.length === 0) {
    return (
      <>
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No likes songs.
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col p-6 gap-y-2 w-full">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LikedContent;
