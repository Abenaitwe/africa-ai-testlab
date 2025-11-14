export const Footer = () => {
  return (
    <footer className="bg-canvas py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="font-bold text-lg mb-2 text-foreground">
          Rate That AI
        </p>
        <p className="text-sm">
          If your AI survives Uganda, it survives anywhere.
        </p>
        <p className="text-xs mt-4">
          © {new Date().getFullYear()} Rate That AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
