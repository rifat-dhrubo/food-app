import React from "react";

import { useHasMounted } from "src/hooks/use-has-mounted";

type Props = {
  children: React.ReactNode;
};

export const ClientOnly = ({ children }: Props) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};
