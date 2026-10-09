
import {integer, pgTable,varchar,timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
const timestamps ={
    ceatedAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().$onUpdate(()=> new Date()).notNull(),
}
    export  const  departments  = pgTable("department",{
        id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
        code: varchar("code",{length:50}).notNull().unique(),
        name: varchar("name",{length:255}).notNull(),
        description: varchar("description",{length:255}).notNull(),
        ...timestamps
    })
export  const  supjects  = pgTable("supjects",{
    id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    departmentId: integer("department_id").notNull().references(()=> departments.id,{ onDelete:'restrict'}),
    code: varchar("code",{length:50}).notNull().unique(),

    name: varchar("name",{length:255}).notNull(),
    description: varchar("description",{length:255}).notNull(),
    ...timestamps
})
export  const departmentRelations= relations(departments,({ many })=>({supjects:many(supjects)}))
export  const subjectsRelations = relations(supjects, ({one, many})=>({
    department: one(departments,{
        fields:[supjects.departmentId],
        references:[departments.id]
    })
}))
export type Department = typeof departments.$inferSelect;
export type NewDepartments = typeof departments.$inferInsert;
export type Subjects = typeof supjects.$inferSelect;
export type NewSubjects = typeof supjects.$inferInsert;