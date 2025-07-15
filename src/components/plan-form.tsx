
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { Plan } from "@/lib/types";
import { Textarea } from "./ui/textarea";
import { Trash2 } from "lucide-react";

const planFormSchema = z.object({
  name: z.string().min(3, "Plan name must be at least 3 characters."),
  description: z.string().min(10, "Description is required."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  ctaLabel: z.string().min(3, "CTA label is required."),
  features: z.array(z.object({ value: z.string().min(3, "Feature cannot be empty.") })),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

interface PlanFormProps {
    plan?: Plan;
}

export function PlanForm({ plan }: PlanFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const defaultValues: Partial<PlanFormValues> = {
    name: plan?.name || "",
    description: plan?.description || "",
    price: plan?.price,
    ctaLabel: plan?.ctaLabel || "",
    features: plan?.features.map(f => ({ value: f })) || [{ value: "" }],
  };

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  function onSubmit(data: PlanFormValues) {
    console.log(data);
    toast({
      title: plan ? "Plan Updated" : "Plan Created",
      description: `The plan "${data.name}" has been saved.`,
    });
    router.push('/billing/plans');
  }

  const pageTitle = plan ? 'Edit Plan' : 'Create Plan';
  const pageDescription = plan ? 'Update the details of this subscription plan.' : 'Add a new subscription plan.';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                 <h1 className="text-3xl font-bold tracking-tight text-nowrap">{pageTitle}</h1>
                 <p className="text-muted-foreground">{pageDescription}</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" type="button" onClick={() => router.back()} className="w-full">Cancel</Button>
                <Button type="submit" className="w-full">Save Plan</Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Plan Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Plan Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Pro Plan" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Price (/month)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 79" {...field} startIcon="$" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:col-span-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short description of the plan." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="md:col-span-2">
                        <FormField
                            control={form.control}
                            name="ctaLabel"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CTA Button Label</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Upgrade to Pro" {...field} />
                                </FormControl>
                                <FormDescription>The text on the call-to-action button.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>List the features included in this plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                            <FormField
                                control={form.control}
                                name={`features.${index}.value`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                    <FormControl>
                                        <Input placeholder="e.g. Up to 10,000 Products" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {fields.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ value: "" })}
                        className="mt-2"
                    >
                        Add Feature
                    </Button>
                </CardContent>
            </Card>
        </div>
      </form>
    </Form>
  );
}
