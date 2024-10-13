"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export const FloatingDock = ({
  items,
  className,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    callback?: () => any;
  }[];
  className?: string;
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <div className={cn(className)}>
      <FloatingDockDesktop
        items={items}
        className={cn(className, desktopClassName)}
      />
      <FloatingDockMobile
        items={items}
        className={cn(className, mobileClassName)}
      />
    </div>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    callback?: () => any;
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full z-50 mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                {item.href ? (
                  <Link
                    href={item?.href || "/"}
                    key={item.title}
                    onClick={(e) => {
                      e.preventDefault();
                      item.callback?.();
                    }}
                    className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 border dark:border-neutral-400 flex items-center justify-center relative"
                  >
                    <div>{item.icon}</div>
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.div
                          initial={{ opacity: 0, x: -80 }}
                          animate={{ opacity: 1, x: -110 }}
                          exit={{ opacity: 0, x: -80 }}
                          className="absolute left-full ml-2  transform -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md"
                        >
                          {item.title}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                ) : (
                  <button
                    key={item.title}
                    onClick={item.callback}
                    className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 border dark:border-neutral-400 flex items-center justify-center relative"
                  >
                    <div>{item.icon}</div>
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.div
                          initial={{ opacity: 0, x: -80 }}
                          animate={{ opacity: 1, x: -110 }}
                          exit={{ opacity: 0, x: -80 }}
                          className="absolute left-full ml-2  transform -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md"
                        >
                          {item.title}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 border dark:border-neutral-400 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    callback?: () => any;
  }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  const [hoveredIndex, setHoveredIndex] = useState("");
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl border border-neutral-400 bg-transparent backdrop-blur-sm shadow-lg px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          currentlyHovered={hoveredIndex === item.title}
          onMouseEnter={() => setHoveredIndex(item.title)}
          {...item}
        />
      ))}
    </motion.div>
  );
};

const IconContainer = ({
  onMouseEnter,
  currentlyHovered,
  mouseX,
  title,
  icon,
  href,
  callback,
}: {
  onMouseEnter: () => void;
  currentlyHovered: boolean;
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  callback?: () => any;
}) => {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // tooltip
  const x = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const [hoverd, setHoverd] = useState(false);

  const Item = ({ onClick }: { onClick?: () => any }) => {
    return (
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => {
          onMouseEnter();
          setHoverd(true);
        }}
        onMouseLeave={() => {
          setHoverd(false);
        }}
        onMouseMove={(e) => {
          const bounds = ref.current?.getBoundingClientRect();
          if (bounds) {
            x.set(e.clientX - bounds.left - bounds.width / 2);
          }
        }}
        onClick={onClick}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        {hoverd && currentlyHovered && (
          <AnimatePresence mode="popLayout">
            <motion.div
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="absolute -top-16 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black dark:bg-neutral-900 z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
              <div className="font-bold text-white relative z-30 text-base ">
                {title}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={(e) => {
            e.preventDefault();
            callback?.();
          }}
        >
          <Item />
        </Link>
      ) : (
        <Item onClick={callback} />
      )}
    </>
  );
};
