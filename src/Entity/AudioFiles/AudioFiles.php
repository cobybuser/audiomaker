<?php
/**
 * @author cobybuser
 * @since 10/2020
 */


namespace App\Entity\AudioFiles;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class AudioFiles
 * @package App\Entity\AudioFiles
 */
class AudioFiles
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * The original filename the file was uploaded with
     *
     * @var string $originalFilename
     * @ORM\Column(type="string", length=255)
     *
     * @Serializer\Type("string")
     * @Assert\NotBlank()
     * @Assert\Length(max=255)
     */
    protected $originalFilename;
    
}