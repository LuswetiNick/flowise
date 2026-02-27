import Footer from "@/components/marketing/footer";
import Header from "@/components/marketing/header";

const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Header />
      <section className="flex-1">{children}</section>
      <Footer />
    </main>
  );
};
export default MarketingLayout;
