import { UseAuth } from 'hooks/UseAuth';
import { Outlet } from 'react-router-dom';
import React from 'react';

export default function AuthProvider() {
  const loading = UseAuth();

  if (!loading) return <Outlet />;

  return <></>;
}
