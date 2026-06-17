"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface FileNode {
  name: string
  type: "file" | "folder"
  id?: string
  children?: FileNode[]
  extension?: string
}

const FILE_ICONS: Record<string, { color: string; icon: string }> = {
  tsx: { color: "oklch(0.65 0.18 200)", icon: "⚛" },
  ts:  { color: "oklch(0.60 0.15 230)", icon: "◆" },
  jsx: { color: "oklch(0.70 0.20 200)", icon: "⚛" },
  js:  { color: "oklch(0.80 0.18 90)",  icon: "◆" },
  css: { color: "oklch(0.65 0.20 280)", icon: "◈" },
  json:{ color: "oklch(0.75 0.15 85)",  icon: "{}" },
  md:  { color: "oklch(0.58 0.06 220)", icon: "◊" },
  py:  { color: "oklch(0.72 0.15 250)", icon: "◆" },
  v:   { color: "oklch(0.65 0.16 290)", icon: "◈" },
  svg: { color: "oklch(0.70 0.15 160)", icon: "◐" },
  png: { color: "oklch(0.65 0.12 160)", icon: "◑" },
  default: { color: "oklch(0.48 0.03 220)", icon: "◇" },
}

function getFileIcon(extension?: string) {
  return FILE_ICONS[extension ?? "default"] ?? FILE_ICONS.default
}

interface FileItemProps {
  node: FileNode
  depth: number
  activeId?: string
  onFileClick: (id: string) => void
}

function FileItem({ node, depth, activeId, onFileClick }: FileItemProps) {
  const [isOpen, setIsOpen] = useState(true)
  const isFolder = node.type === "folder"
  const hasChildren = isFolder && !!node.children?.length
  const isActive = !isFolder && !!node.id && node.id === activeId
  const fileIcon = getFileIcon(node.extension)

  const handleClick = () => {
    if (isFolder) {
      if (node.id) {
        onFileClick(node.id)
      } else {
        setIsOpen((v) => !v)
      }
    } else if (node.id) {
      onFileClick(node.id)
    }
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
        className={cn(
          "group flex items-center gap-1.5 pr-3 py-1 rounded-sm cursor-pointer select-none",
          "transition-colors duration-100",
          isActive
            ? "bg-[oklch(0.22_0.04_220)] text-foreground"
            : "text-muted-foreground hover:bg-[oklch(0.17_0.02_220)] hover:text-foreground/90",
        )}
      >
        {/* Chevron */}
        <span
          className={cn(
            "w-3 h-3 flex items-center justify-center transition-transform duration-150 shrink-0",
            isFolder && isOpen && "rotate-90",
          )}
        >
          {isFolder && (
            <svg
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
              className="text-muted-foreground/50"
            >
              <path
                d="M1 1L5 4L1 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {/* Icon */}
        {isFolder ? (
          <svg
            width="14"
            height="12"
            viewBox="0 0 16 14"
            fill="currentColor"
            className="text-[oklch(0.78_0.15_85)] shrink-0"
          >
            <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
          </svg>
        ) : (
          <span className="text-xs shrink-0 leading-none" style={{ color: fileIcon.color }}>
            {fileIcon.icon}
          </span>
        )}

        {/* Name */}
        <span
          className={cn(
            "text-sm font-mono truncate flex-1 min-w-0",
            isActive && "text-foreground",
          )}
        >
          {node.name}
        </span>

        {/* Active dot */}
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            key="children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <FileItem
                key={child.name}
                node={child}
                depth={depth + 1}
                activeId={activeId}
                onFileClick={onFileClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FileTree({
  data,
  activeId,
  onFileClick,
  className,
}: {
  data: FileNode[]
  activeId?: string
  onFileClick: (id: string) => void
  className?: string
}) {
  return (
    <div className={cn("py-1", className)}>
      {data.map((node) => (
        <FileItem
          key={node.name}
          node={node}
          depth={0}
          activeId={activeId}
          onFileClick={onFileClick}
        />
      ))}
    </div>
  )
}
