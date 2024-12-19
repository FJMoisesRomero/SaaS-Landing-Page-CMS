import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Leading provider of innovative SaaS solutions for modern businesses.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">Products</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Solutions</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Pricing</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Resources</Button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                contact@saasco.com
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 SaaSCo. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Button variant="link" className="text-sm p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" className="text-sm p-0 h-auto">
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}