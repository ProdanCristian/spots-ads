import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="space-y-8">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                  Connect <span className="text-primary">Creators</span> with <span className="text-primary">Brands</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  SpotsAds helps creators monetize their content while enabling businesses to reach their target audience at competitive rates.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="bg-primary" asChild>
                    <Link href="/login">Start as Creator</Link>
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto aspect-video w-full max-w-lg rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-4 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl">🚀</div>
                    <p className="mt-4 font-medium">Launch your campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose SpotsAds?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform makes advertising partnerships simple, effective, and profitable for everyone involved.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-6 transition-all hover:shadow-md">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Maximize Earnings</h3>
                <p className="text-muted-foreground">
                  Creators earn competitive rates for their ad spots while maintaining content authenticity.
                </p>
              </Card>
              <Card className="p-6 transition-all hover:shadow-md">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Targeted Reach</h3>
                <p className="text-muted-foreground">
                  Businesses connect with creators whose audience matches their target market.
                </p>
              </Card>
              <Card className="p-6 transition-all hover:shadow-md">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                <p className="text-muted-foreground">
                  Simple onboarding process for both creators and advertisers to get started quickly.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Our Users Say</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hear from creators and advertisers who have found success on our platform.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6">
                <div className="flex flex-col space-y-4">
                  <p className="italic text-muted-foreground">
                    &ldquo;SpotsAds has transformed how I monetize my content. The platform made it easy to connect with brands that align with my values, and I&apos;ve increased my revenue by 35%.&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">Jamie Doe</p>
                      <p className="text-sm text-muted-foreground">Travel Creator</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex flex-col space-y-4">
                  <p className="italic text-muted-foreground">
                    &ldquo;As a small business, finding the right advertising channels was always challenging. SpotsAds connected us with creators who speak directly to our target audience, and our conversion rates have never been better.&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">AS</span>
                    </div>
                    <div>
                      <p className="font-medium">Alex Smith</p>
                      <p className="text-sm text-muted-foreground">Marketing Director</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of creators and businesses already using SpotsAds to grow their audience and revenue.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/login">Create Free Account</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}