import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const projectTypes = ["Residential Home", "Commercial Complex", "Multiplex Development", "Renovation", "Other"];
const budgetRanges = ["Below ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹3Cr", "Above ₹3Cr", "To be discussed"];

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
          subject: `New Enquiry from ${values.name} - ${values.project_type || 'General'}`,
          from_name: "Devansh Buildsmore Website",
          ...values,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Enquiry sent successfully. Our team will contact you soon.");
        reset();
      } else {
        throw new Error(result.message || "Failed to send enquiry");
      }
    } catch (error) {
      toast.error("Unable to submit enquiry. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-shell pb-24">
      <div className="content-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="section-eyebrow" data-testid="contact-eyebrow">Contact Us</p>
          <h2 className="section-title" data-testid="contact-title">Tell Us About Your Project</h2>
          <p className="section-description" data-testid="contact-description">
            Share your requirements and we’ll get back with practical guidance for scope, timeline, and execution strategy.
          </p>
          <p className="text-sm text-[#ffb780]" data-testid="contact-form-note">
            Keep most details optional — just add your name and at least email or phone.
          </p>
        </div>

        <form className="surface-panel space-y-4" onSubmit={handleSubmit(onSubmit)} data-testid="contact-form">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="form-label" htmlFor="name">Name *</label>
              <Input
                id="name"
                placeholder="Your full name"
                className="industrial-input"
                data-testid="contact-name-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="error-text" data-testid="contact-name-error">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="form-label" htmlFor="phone">Phone</label>
              <Input
                id="phone"
                placeholder="+91"
                className="industrial-input"
                data-testid="contact-phone-input"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="form-label" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="industrial-input"
                data-testid="contact-email-input"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label" htmlFor="city_location">City / Location</label>
              <Input
                id="city_location"
                placeholder="e.g. Ghaziabad"
                className="industrial-input"
                data-testid="contact-city-input"
                {...register("city_location")}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="form-label" htmlFor="interest_area">Interest Area</label>
              <Input
                id="interest_area"
                placeholder="Residential / Commercial"
                className="industrial-input"
                data-testid="contact-interest-input"
                {...register("interest_area")}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label" htmlFor="project_type">Project Type</label>
              <select
                id="project_type"
                className="industrial-input h-10"
                data-testid="contact-project-type-select"
                {...register("project_type")}
              >
                <option value="">Select (optional)</option>
                {projectTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="form-label" htmlFor="budget_range">Budget Range</label>
              <select
                id="budget_range"
                className="industrial-input h-10"
                data-testid="contact-budget-select"
                {...register("budget_range")}
              >
                <option value="">Select (optional)</option>
                {budgetRanges.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="form-label" htmlFor="plot_area">Plot / Area</label>
              <Input
                id="plot_area"
                placeholder="e.g. 2400 sq. ft"
                className="industrial-input"
                data-testid="contact-plot-area-input"
                {...register("plot_area")}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label" htmlFor="preferred_start_date">Preferred Start Date</label>
              <Input
                id="preferred_start_date"
                type="text"
                placeholder="DD/MM/YYYY"
                className="industrial-input"
                data-testid="contact-start-date-input"
                {...register("preferred_start_date")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="form-label" htmlFor="message">Message</label>
            <Textarea
              id="message"
              rows={5}
              className="industrial-input"
              placeholder="Tell us what you are planning to build..."
              data-testid="contact-message-textarea"
              {...register("message")}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="primary-cta w-full"
            data-testid="contact-submit-button"
          >
            {submitting ? "Sending Enquiry..." : "Send Enquiry"}
          </Button>
        </form>
      </div>
    </div>
  );
}