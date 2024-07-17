import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AccordionHeader({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <motion.div onClick={onClick} className={cn("", className)}>
      {children}
    </motion.div>
  );
}

export function AccordionPanel({
  children,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 1 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
        >
          <div className={cn("", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
