import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface UpvoteButtonProps {
  projectId: string;
  initialUpvotes: number;
  size?: "sm" | "md" | "lg";
}

export const UpvoteButton = ({ projectId, initialUpvotes, size = "md" }: UpvoteButtonProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkIfUpvoted = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('upvotes')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', session.user.id)
      .single();

    setHasUpvoted(!!data);
  }, [projectId]);

  useEffect(() => {
    checkIfUpvoted();
  }, [checkIfUpvoted]);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Login required",
        description: "Please login to upvote projects",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (hasUpvoted) {
        // Remove upvote
        const { error } = await supabase
          .from('upvotes')
          .delete()
          .eq('project_id', projectId)
          .eq('user_id', session.user.id);

        if (error) throw error;

        setHasUpvoted(false);
        setUpvotes(upvotes - 1);
      } else {
        // Add upvote
        const { error } = await supabase
          .from('upvotes')
          .insert({
            project_id: projectId,
            user_id: session.user.id,
          });

        if (error) throw error;

        setHasUpvoted(true);
        setUpvotes(upvotes + 1);
      }
    } catch (error) {
      const err = error as Error
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3",
    lg: "h-12 px-4 text-lg",
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={hasUpvoted ? "default" : "outline"}
        size="sm"
        className={`${sizeClasses[size]} border-2 border-accent ${
          hasUpvoted ? 'bg-primary text-primary-foreground' : ''
        }`}
        onClick={handleUpvote}
        disabled={loading}
      >
        <ArrowUp className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} mr-1`} />
        {upvotes}
      </Button>
    </motion.div>
  );
};
