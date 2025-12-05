import { motion } from "framer-motion";
import ChangeEmailForm from "../ChangeEmailForm";
import ChangePasswordForm from "../ChangePasswordForm";

//компонент для изменения email и пароля пользователя
export function AccountChangeInfo() {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
      }}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.25 }}>
        <ChangeEmailForm />
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.25 }}>
        <ChangePasswordForm />
      </motion.div>
    </motion.div>
  );
}
