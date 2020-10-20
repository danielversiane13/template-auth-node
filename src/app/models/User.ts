import bcrypt from 'bcryptjs'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string

  @Column({ type: 'varchar', select: false })
  password: string

  @Column({ type: 'boolean' })
  is_active: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string

  async passwordHash(password: string) {
    if (password) {
      this.password = await bcrypt.hash(password, 8)
    }
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}
