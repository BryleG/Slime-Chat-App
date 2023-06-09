'use client';

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";


import Avatar from "@/app/components/Avatar";
import ProfileDrawer from './ProfileDrawer';
import useActiveList from '@/app/hooks/useActiveList';



interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer 
        data={conversation} 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
      />
      <div 
        className="
          bg-gray-950
          w-full 
          flex 
    
          sm:px-4 
          py-3 
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations" 
            className="
              lg:hidden 
              block 
              text-gray-500 
              hover:text-gray-600 
              transition 
              cursor-pointer
            "
          >
            <HiChevronLeft size={32} />
          </Link>
          <div className="flex flex-col text-white">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-400">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
            text-white
            cursor-pointer
            hover:text-red-400
            transition
          "
        />
      </div>
      </>
    );
  }
 
export default Header;