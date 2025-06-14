
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface UserInfoFormProps {
  onSubmit: (data: { name: string; email: string }) => void;
  selectedSize: number;
}

const UserInfoForm = ({ onSubmit, selectedSize }: UserInfoFormProps) => {
  const { language } = useLanguage();
  
  const formSchema = z.object({
    name: z.string().min(2, {
      message: getTranslation(language, 'nameMinLength'),
    }),
    email: z.string().email({ message: getTranslation(language, 'invalidEmail') }).optional().or(z.literal("")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      name: data.name,
      email: data.email || "",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-center text-k21-black">
        {getTranslation(language, 'participantInfo')}
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation(language, 'fullName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={getTranslation(language, 'enterName')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getTranslation(language, 'email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={getTranslation(language, 'emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-k21-teal hover:bg-k21-teal/90"
              >
                {getTranslation(language, 'startQuizWith')} {selectedSize} {getTranslation(language, 'questions')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInfoForm;
