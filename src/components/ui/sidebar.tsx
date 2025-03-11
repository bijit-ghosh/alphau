
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SidebarContext = React.createContext<{
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}>({
  expanded: true,
  setExpanded: () => {},
  activeSection: "",
  setActiveSection: () => {},
});

export function SidebarProvider({
  children,
  defaultExpanded = true,
  defaultSection = "home",
}: {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  defaultSection?: string;
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [activeSection, setActiveSection] = React.useState(defaultSection);

  return (
    <SidebarContext.Provider
      value={{ expanded, setExpanded, activeSection, setActiveSection }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={expanded ? "expanded" : "collapsed"}
        initial={{ width: expanded ? 0 : 70 }}
        animate={{ width: expanded ? 250 : 70 }}
        exit={{ width: expanded ? 0 : 70 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "bg-alpha-darknavy border-r border-white/5 h-full flex flex-col z-40 fixed top-0 left-0 overflow-hidden",
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SidebarHeader({ children }: { children?: React.ReactNode }) {
  const { expanded } = useSidebar();

  return (
    <div className="h-16 flex items-center px-4 border-b border-white/5">
      {children || (
        <div className="flex items-center space-x-2 overflow-hidden">
          <div className="relative h-8 w-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF] rounded-full opacity-20 blur-md animate-pulse"></div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF]">
              A
            </div>
          </div>
          {expanded && (
            <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF]">
              AlphaU Dashboard
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 overflow-auto py-4">{children}</div>;
}

export function SidebarFooter({ children }: { children?: React.ReactNode }) {
  const { expanded } = useSidebar();
  
  return (
    <div className="h-16 border-t border-white/5 flex items-center px-4">
      {children || (
        <div className="text-xs text-gray-400">
          {expanded ? "Dashboard v1.0" : "v1.0"}
        </div>
      )}
    </div>
  );
}

export function SidebarTrigger() {
  const { expanded, setExpanded } = useSidebar();

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="fixed top-4 left-4 z-50 p-2 rounded-full bg-alpha-darknavy/90 border border-white/10 text-white/80 hover:text-white hover:bg-alpha-darknavy transition-colors shadow-lg"
    >
      {expanded ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  );
}

export function SidebarGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-3 py-2">{children}</div>;
}

export function SidebarGroupLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { expanded } = useSidebar();
  
  if (!expanded) return null;
  
  return (
    <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {children}
    </div>
  );
}

export function SidebarGroupContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export function SidebarMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="space-y-1">{children}</ul>;
}

export function SidebarMenuItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li>{children}</li>;
}

export function SidebarMenuButton({
  children,
  active,
  asChild,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  asChild?: boolean;
  onClick?: () => void;
}) {
  const { expanded } = useSidebar();
  
  // Handle the case where children is a string
  if (typeof children === 'string') {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center w-full px-2 py-2 rounded-md text-sm transition-colors",
          expanded ? "justify-start" : "justify-center",
          active
            ? "bg-alpha-blue/20 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/10"
        )}
      >
        {children}
      </button>
    );
  }
  
  // Handle when children is a ReactElement
  const child = React.isValidElement(children) ? children : null;
  
  if (!child) {
    return <>{children}</>;
  }
  
  if (asChild) {
    // Fix: Properly type the props by removing className from the cloneElement call
    // and instead handling it in the component's children
    return React.cloneElement(child, {
      ...child.props,
      onClick,
      style: {
        ...(child.props.style || {}),
      },
    });
  }
  
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center w-full px-2 py-2 rounded-md text-sm transition-colors",
        expanded ? "justify-start" : "justify-center",
        active
          ? "bg-alpha-blue/20 text-white"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (expanded || typeof child.type !== 'string') {
            if (typeof child.type !== 'string') {
              return React.cloneElement(child, {
                className: cn(
                  "h-5 w-5",
                  child.props.className
                ),
              });
            }
            return child;
          }
          return null;
        }
        return child;
      })}
    </button>
  );
}
